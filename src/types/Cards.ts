export interface ICard {
  suit: string;
  value: string;
}

export interface IHand {
  cards: ICard[];
  total: number;
}
