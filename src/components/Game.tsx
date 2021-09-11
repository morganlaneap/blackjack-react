import React, { FC } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Card from "components/Card";
import { useGameStore } from "stores/gameStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
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
  const store = useGameStore();

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          Dealer
        </Typography>
        <Typography variant="h5">{store.dealerHand.total}</Typography>
      </Paper>

      <div className={classes.cardContainer}>
        {store.dealerHand.cards.map((c, i) => (
          <Card card={c} key={i} />
        ))}
      </div>

      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          You
        </Typography>
        <Typography variant="h5">{store.playerHand.total}</Typography>
      </Paper>

      <div className={classes.cardContainer}>
        {store.playerHand.cards.map((c, i) => (
          <Card card={c} key={i} />
        ))}
      </div>

      <Paper className={classes.paper}>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              store.hitPlayer();
            }}
          >
            Hit
          </Button>

          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              store.hitPlayer();
            }}
          >
            Stand
          </Button>
        </div>

        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              store.reset();
            }}
          >
            New Game
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Game;
