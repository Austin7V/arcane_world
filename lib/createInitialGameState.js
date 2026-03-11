import playerCardsData from "./playerCardsData";
import monsterCardsData from "./monsterCardsData";

export default function createInitialGameState() {
  const starterDeck = [...playerCardsData];

  return {
    screen: "battle",
    runStarted: true,
    player: {
      name: "Austin",
      hp: starterDeck.length,
      armor: 1,
      hand: [],
      deck: starterDeck,
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
