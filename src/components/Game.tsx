import React, { FC, useEffect } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Card from "components/Card";
import { useGameStore } from "stores/gameStore";
import clsx from "clsx";

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
  })
);

const Game: FC = () => {
  const classes = useStyles();
  const game = useGameStore();

  useEffect(() => {
    game.newGame();
  }, []);

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
        {game.gameResult === "" && <Typography>Good luck!</Typography>}

        {game.isOver && game.gameResult === "WIN" && (
          <Typography>You win!</Typography>
        )}

        {game.isOver && game.gameResult === "LOSE" && (
          <Typography>You lose!</Typography>
        )}

        {game.isOver && game.gameResult === "PUSH" && (
          <Typography>Push!</Typography>
        )}

        {game.isOver && game.gameResult === "BLACKJACK" && (
          <Typography>Blackjack!</Typography>
        )}

        <div className={classes.buttonContainer}>
          <Button
            size="large"
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              game.hitPlayer();
            }}
            disabled={game.isThinking || game.isOver}
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
            disabled={game.isThinking || game.isOver}
          >
            Stand
          </Button>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            size="large"
            fullWidth
            color="primary"
            variant="contained"
            onClick={() => {
              game.newGame();
            }}
            disabled={game.isThinking}
          >
            New Game
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Game;
