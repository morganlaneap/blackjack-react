import React, { FC } from "react";
import clsx from "clsx";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const Info: FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={clsx(classes.paper)}>
        <Typography variant="h5">Welcome to Blackjack!</Typography>
        <Typography>
          The game is simple. Your aim is to beat the dealer's hand without
          going over 21. If both you and the dealer get the same number, it's a
          push (you'd get your bet back). There are some base rules for this
          game:
        </Typography>

        <ul>
          <li>
            <Typography>The dealer must draw to 16.</Typography>
          </li>
          <li>
            <Typography>The dealer must stand on 17 or higher.</Typography>
          </li>
          <li>
            <Typography>A win pays 2 to 1.</Typography>
          </li>
          <li>
            <Typography>Blackjack pays 3 to 2.</Typography>
          </li>
          <li>
            <Typography>Push returns your bet.</Typography>
          </li>
        </ul>

        <Typography>
          For legal reasons, this is not a gambling site, you cannot win any
          money. So have fun and spend all your imaginary money!
        </Typography>
        <br />

        <Typography>Press 'New Game' to get started.</Typography>
      </Paper>
    </div>
  );
};

export default Info;
