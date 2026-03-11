import playerCardsData from "./playerCardsData";
import monsterCardsData from "./monsterCardsData";

export default function createInitialGameState() {
  const starterDeck = [...playerCardsData];
  const startingHand = starterDeck.slice(0, 3);
  const remainingDeck = starterDeck.slice(3);

  return {
    screen: "battle",
    runStarted: true,
    player: {
      name: "Austin",
      hp: starterDeck.length,
      armor: 1,
      hand: startingHand,
      deck: remainingDeck,
    },
    currentMonster: null,
    battleResult: null,
    victories: 0,
    cardPools: {
      playerCards: playerCardsData,
      monsterCards: monsterCardsData,
    },
  };
}
