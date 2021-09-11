import React, { FC } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MuiCard from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { ICard } from "types/Cards";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "inline-block",
      width: theme.spacing(8),
      margin: theme.spacing(1),
    },
    card: {
      padding: 0,
      height: theme.spacing(12),
    },
    cardContent: {
      padding: theme.spacing(1),
      textAlign: "center",
    },
    valueText: {
      fontWeight: "bold",
      fontSize: "24px",
    },
    red: {
      color: "red",
      fontSize: "24px",
    },
    black: {
      color: "black",
      fontSize: "24px",
    },
    hidden: {
      backgroundImage: "url('images/card-back.png')",
      border: "4px solid white",
      boxSizing: "border-box",
    },
    none: {
      display: "none",
    },
  })
);

const Card: FC<{
  card: ICard;
}> = ({ card }) => {
  const classes = useStyles();

  const getSuitIcon = (suit: string) => {
    switch (suit) {
      case "hearts":
        return <Typography className={classes.red}>&#9829;</Typography>;
      case "diamonds":
        return <Typography className={classes.red}>&#9830;</Typography>;
      case "spades":
        return <Typography className={classes.black}>&#9824;</Typography>;
      case "clubs":
        return <Typography className={classes.black}>&#9827;</Typography>;
    }
  };

  return (
    <div className={classes.container}>
      <MuiCard
        className={
          card.hidden ? clsx(classes.card, classes.hidden) : classes.card
        }
      >
        <CardContent
          className={card.hidden ? classes.none : classes.cardContent}
        >
          <Typography className={classes.valueText}>{card.value}</Typography>
          {getSuitIcon(card.suit)}
        </CardContent>
      </MuiCard>
    </div>
  );
};

export default Card;
