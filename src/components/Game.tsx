import React, { FC, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ICard } from "types/Cards";
import Card from "components/Card";
import { useGameStore } from "stores/gameStore";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Game: FC = () => {
  const classes = useStyles();
  const store = useGameStore();

  return (
    <div>
      {store.playerHand.cards.map((c, i) => (
        <Card card={c} key={i} />
      ))}
      <Typography>{store.playerHand.total}</Typography>

      <button
        onClick={() => {
          store.reset();
        }}
      >
        New Game
      </button>

      <button
        onClick={() => {
          store.hitPlayer();
        }}
      >
        Hit Player
      </button>
    </div>
  );
};

export default Game;
