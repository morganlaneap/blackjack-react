export interface ICard {
  suit: string;
  value: string;
  hidden: boolean;
}

export interface IHand {
  cards: ICard[];
  total: number;
}
