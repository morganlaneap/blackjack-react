import React, { FC } from "react";
import clsx from "clsx";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { useGameStore } from "stores/gameStore";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const Stats: FC = () => {
  const classes = useStyles();
  const game = useGameStore();

  return (
    <div>
      <Paper className={clsx(classes.paper)}>
        <Typography variant="h5">Game History</Typography>

        <Box pt={2}>
          {game.gameHistory.map((h, i) => (
            <Paper elevation={2} key={i} className={classes.paper}>
              <Typography>
                <b>{h.result}</b>&nbsp;&nbsp;Bet: {h.bet}&nbsp;&nbsp;D:{" "}
                {h.dealerTotal}&nbsp;&nbsp;P: {h.playerTotal}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Paper>
    </div>
  );
};

export default Stats;
