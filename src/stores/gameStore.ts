import create from "zustand";
import { configurePersist } from "zustand-persist";

import { ICard, IHand } from "types/Cards";
const cardData: ICard[] = require("staticData/cards.json");

const synth = window.speechSynthesis;

const { persist, purge } = configurePersist({
  storage: localStorage,
  rootKey: "root",
});

interface IGameStore {
  reset: () => void;
  newGame: () => void;
  bet: number;
  isThinking: boolean;
  isOver: boolean;
  gameResult: string;
  deck: ICard[];
  playerHand: IHand;
  dealerHand: IHand;
  balance: number;
  hitPlayer: () => void;
  playerStand: () => void;
  changeBet: (by: number) => void;
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
  return total;
};

const delay = (action: () => any) => {
  setTimeout(action, 1000);
};

export const useGameStore = create<IGameStore>(
  persist(
    {
      key: "game",
    },
    (set, get) => ({
      deck: cardData,
      bet: 10,
      changeBet: (by: number) => {
        set({ bet: get().bet + by });
      },
      isThinking: false,
      isOver: false,
      gameResult: "",
      playerHand: {
        cards: [],
        total: 0,
      },
      dealerHand: {
        cards: [],
        total: 0,
      },
      balance: 1000,
      hitPlayer: () => {
        const deck = [...get().deck];
        const playerHand = get().playerHand;
        const nextCard = deck.pop();
        const newCards = [...playerHand.cards, nextCard!];
        const newHand = {
          cards: newCards,
          total: calculateTotal(newCards),
        };
        synth.speak(new SpeechSynthesisUtterance(newHand.total.toString()));
        set({
          deck: deck,
          playerHand: newHand,
          isOver: newHand.total > 21,
          gameResult: newHand.total > 21 ? "LOSE" : "",
        });
      },
      playerStand: () => {
        set({ isThinking: true });

        // Reveal dealers card
        delay(() => {
          const bet = get().bet;
          const deck = [...get().deck];
          const nextCard = deck.pop();

          const dealerHand = get().dealerHand;
          const playerHand = get().playerHand;

          dealerHand.cards = [...dealerHand.cards, nextCard!];
          dealerHand.total = calculateTotal(dealerHand.cards);

          set({
            dealerHand: dealerHand,
            deck: deck,
          });

          if (dealerHand.total < 16) {
            get().playerStand();
          } else {
            const win =
              (playerHand.total <= 21 && playerHand.total > dealerHand.total) ||
              dealerHand.total > 21;
            const push = playerHand.total === dealerHand.total;
            const gameResult = win ? "WIN" : push ? "PUSH" : "LOSE";

            let balance = get().balance;

            if (gameResult === "WIN") {
              synth.speak(new SpeechSynthesisUtterance("Player wins!"));
              balance = balance + 2 * bet;
            } else if (gameResult === "PUSH") {
              synth.speak(new SpeechSynthesisUtterance("Push!"));
              balance = balance + bet;
            } else {
              synth.speak(new SpeechSynthesisUtterance("Dealer wins."));
            }

            set({
              isThinking: false,
              balance: balance,
              isOver: true,
              gameResult: gameResult,
            });
          }
        });
      },
      newGame: () => {
        let gameResult = "";
        const bet = get().bet;
        let balance = get().balance;

        // Shuffle deck
        const shuffledDeck = shuffle(get().deck);

        // Deal new cards
        const playerCards = [shuffledDeck[0], shuffledDeck[2]];
        const dealerCards = [shuffledDeck[1]];

        // Remove the top 4 cards
        shuffledDeck.splice(0, 3);

        if (
          (playerCards[0].value === "J" && playerCards[1].value === "A") ||
          (playerCards[0].value === "A" && playerCards[1].value === "J")
        ) {
          gameResult = "BLACKJACK";
          balance = balance + 1.5 * bet;
          synth.speak(new SpeechSynthesisUtterance("Blackjack!"));
        } else {
          synth.speak(
            new SpeechSynthesisUtterance(calculateTotal(playerCards).toString())
          );
          balance = balance - bet;
        }

        // Update state
        set({
          deck: shuffledDeck,
          balance: balance,
          isThinking: false,
          isOver: gameResult !== "",
          gameResult: gameResult,
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
      reset: () => {
        purge();
        set({
          deck: cardData,
          bet: 10,
          isThinking: false,
          isOver: false,
          gameResult: "",
          playerHand: {
            cards: [],
            total: 0,
          },
          dealerHand: {
            cards: [],
            total: 0,
          },
          balance: 1000,
        });
      },
    })
  )
);
