import React, { FC } from "react";
import clsx from "clsx";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Card from "components/Card";
import { useGameStore } from "stores/gameStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    center: {
      textAlign: "center",
    },
    flex: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    betBox: {
      textAlign: "center",
    },
  })
);

const Game: FC = () => {
  const classes = useStyles();
  const game = useGameStore();

  return (
    <div>
      <Paper className={clsx(classes.paper, classes.flex)}>
        <Typography className={classes.title} variant="h5">
          Dealer
        </Typography>
        <Typography variant="h5">{game.dealerHand.total}</Typography>
      </Paper>

      <div className={classes.cardContainer}>
        {game.dealerHand.cards.map((c, i) => (
          <Card card={c} key={i} />
        ))}

        {game.dealerHand.cards.length === 1 && (
          <Card card={{ suit: "", value: "", hidden: true }} />
        )}
      </div>

      <Paper className={clsx(classes.paper, classes.flex)}>
        <Typography className={classes.title} variant="h5">
          You
        </Typography>
        <Typography variant="h5">{game.playerHand.total}</Typography>
      </Paper>

      <div className={classes.cardContainer}>
        {game.playerHand.cards.map((c, i) => (
          <Card card={c} key={i} />
        ))}
      </div>

      <Paper className={clsx(classes.paper, classes.center)}>
        {game.gameResult === "" && <Typography>Good luck 🍀</Typography>}

        {game.isOver && game.gameResult === "WIN" && (
          <Typography>You win 🤑</Typography>
        )}

        {game.isOver && game.gameResult === "LOSE" && (
          <Typography>You lose 😢</Typography>
        )}

        {game.isOver && game.gameResult === "PUSH" && (
          <Typography>Push 💪</Typography>
        )}

        {game.isOver && game.gameResult === "BLACKJACK" && (
          <Typography>Blackjack! 💲</Typography>
        )}
      </Paper>

      <Paper className={clsx(classes.paper, classes.center)}>
        <Typography>Balance: &pound;{game.balance.toFixed(2)}</Typography>

        <div className={classes.buttonContainer}>
          <Button
            size="large"
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              game.hitPlayer();
            }}
            disabled={
              game.isThinking ||
              game.isOver ||
              game.playerHand.cards.length === 0
            }
          >
            Hit
          </Button>

          <Button
            size="large"
            fullWidth
            color="secondary"
            variant="contained"
            onClick={() => {
              game.playerStand();
            }}
            disabled={
              game.isThinking ||
              game.isOver ||
              game.playerHand.cards.length === 0
            }
          >
            Stand
          </Button>
        </div>

        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              game.changeBet(-10);
            }}
            disabled={game.bet <= 10}
          >
            -
          </Button>
          <TextField
            type="number"
            aria-readonly="true"
            className={classes.betBox}
            value={game.bet}
            variant="outlined"
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              game.changeBet(10);
            }}
          >
            +
          </Button>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            size="large"
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              if (game.bet > game.balance) {
                alert("You do not have enough money!");
              } else {
                game.newGame();
              }
            }}
            disabled={game.isThinking}
          >
            New Game
          </Button>
        </div>

        <div>
          <Button
            size="small"
            fullWidth
            color="primary"
            variant="outlined"
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm("Are you sure you want to do this?")) {
                game.reset();
              }
            }}
          >
            Reset Progress
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Game;
