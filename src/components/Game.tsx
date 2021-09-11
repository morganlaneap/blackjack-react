import React, { FC, useEffect, useState } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ICard } from "types/Cards";
import Card from "components/Card";

const cardData: ICard[] = require("staticData/cards.json");

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const Game: FC = () => {
  const classes = useStyles();

  const [cards, setCards] = useState<ICard[]>(cardData);

  const shuffleArray = (array: ICard[]) => {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    setCards(newArr);
  };

  return (
    <div>
      {cards.map((c, i) => (
        <Card card={c} key={i} />
      ))}

      <button
        onClick={() => {
          shuffleArray(cards);
        }}
      >
        Shuffle
      </button>
    </div>
  );
};

export default Game;
