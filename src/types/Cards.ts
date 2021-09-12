export interface ICard {
  suit: string;
  value: string;
  hidden: boolean;
}

export interface IHand {
  cards: ICard[];
  total: number;
}

export interface IGame {
  dealerTotal: number;
  playerTotal: number;
  bet: number;
  balanceBefore: number;
  balanceAfter: number;
  result: string;
}
