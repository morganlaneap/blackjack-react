import create from "zustand";
import { configurePersist } from "zustand-persist";

import { ICard, IHand } from "types/Cards";
const cardData: ICard[] = require("staticData/cards.json");

const synth = window.speechSynthesis;

const { persist, purge } = configurePersist({
  storage: sessionStorage,
  rootKey: "root",
});

interface IGameStore {
  newGame: () => void;
  isThinking: boolean;
  isOver: boolean;
  gameResult: string;
  deck: ICard[];
  playerHand: IHand;
  dealerHand: IHand;
  hitPlayer: () => void;
  playerStand: () => void;
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

            set({
              isThinking: false,
              isOver: true,
              gameResult: gameResult,
            });

            if (gameResult === "WIN") {
              synth.speak(new SpeechSynthesisUtterance("Player wins!"));
            } else if (gameResult === "PUSH") {
              synth.speak(new SpeechSynthesisUtterance("Push!"));
            } else {
              synth.speak(new SpeechSynthesisUtterance("Dealer wins."));
            }
          }
        });
      },
      newGame: () => {
        purge();
        let gameResult = "";

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
          synth.speak(new SpeechSynthesisUtterance("Blackjack!"));
        }

        // Update state
        set({
          deck: shuffledDeck,
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
    })
  )
);
