import playerCardsData from "./playerCardsData";
import monsterCardsData from "./monsterCardsData";

export default function createInitialGameState() {
  return {
    screen: "battle",
    runStarted: true,
    player: {
      name: "Austin",
      hp: 10,
    },
    deck: [],
    currentMonster: null,
    battleResult: null,
    victories: 0,
    cardPools: {
      playerCards: playerCardsData,
      monsterCards: monsterCardsData,
    },
  };
}
