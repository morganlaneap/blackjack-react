import create from "zustand";
import { configurePersist } from "zustand-persist";

import { ICard, IHand } from "types/Cards";
const cardData: ICard[] = require("staticData/cards.json");

const { persist, purge } = configurePersist({
  storage: sessionStorage,
  rootKey: "root",
});

interface IGameStore {
  newGame: () => void;
  deck: ICard[];
  playerHand: IHand;
  dealerHand: IHand;
  hitPlayer: () => void;
  hitDealer: () => void;
}

const shuffle = (array: ICard[]) => {
  let newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const calculateTotal = (cards: ICard[]) => {
  let total: number = 0;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (!card.hidden) {
      switch (card.value) {
        case "A":
        case "J":
        case "Q":
        case "K":
          total += 10;
          break;
        default:
          total += Number.parseInt(card.value);
          break;
      }
    }
  }
  return total;
};

export const useGameStore = create<IGameStore>(
  persist(
    {
      key: "game",
    },
    (set, get) => ({
      deck: cardData,
      playerHand: {
        cards: [],
        total: 0,
      },
      dealerHand: {
        cards: [],
        total: 0,
      },
      hitPlayer: () => {
        const deck = [...get().deck];
        const playerHand = get().playerHand;
        const nextCard = deck.pop();
        const newCards = [...playerHand.cards, nextCard!];
        set({
          deck: deck,
          playerHand: {
            cards: newCards,
            total: calculateTotal(newCards),
          },
        });
      },
      hitDealer: () => {
        const deck = [...get().deck];
        const dealerHand = get().dealerHand;
        const nextCard = deck.pop();
        const newCards = [...dealerHand.cards, nextCard!];
        set({
          deck: deck,
          dealerHand: {
            cards: newCards,
            total: calculateTotal(newCards),
          },
        });
      },
      newGame: () => {
        purge();

        // Shuffle deck
        const shuffledDeck = shuffle(get().deck);

        // Deal new cards
        const playerCards = [shuffledDeck[0], shuffledDeck[2]];
        const dealerCards = [
          shuffledDeck[1],
          { ...shuffledDeck[3], hidden: true },
        ];

        // Remove the top 4 cards
        shuffledDeck.splice(0, 4);

        // Update state
        set({
          deck: shuffledDeck,
          playerHand: {
            cards: playerCards,
            total: calculateTotal(playerCards),
          },
          dealerHand: {
            cards: dealerCards,
            total: calculateTotal(dealerCards),
          },
        });
      },
    })
  )
);
