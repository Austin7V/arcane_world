import playerCardsData from "../data/playerCardsData";
import monsterCardsData from "../data/monsterCardsData";
import monsterData from "../data/monsterData";

export default function createInitialGameState() {
  const starterDeck = [...playerCardsData];
  const schuffleDeck = [...starterDeck].sort(() => Math.random() - 0.5);
  const startingHand = schuffleDeck.slice(0, 3);
  const remainingDeck = schuffleDeck.slice(3);

  const randomMonster =
    monsterData[Math.floor(Math.random() * monsterData.length)];

  const monsterDeck = [];
  for (let index = 0; index < randomMonster.hp; index++) {
    const randomCard =
      monsterCardsData[Math.floor(Math.random() * monsterCardsData.length)];
    monsterDeck.push(randomCard);
  }

  return {
    runStarted: true,
    player: {
      name: "Austin",
      armor: 1,
      hand: startingHand,
      deck: remainingDeck,
      pendingDraw: 0,
    },
    currentMonster: { ...randomMonster, deck: monsterDeck },
    battleResult: null,
    victories: 0,
    cardPools: {
      playerCards: playerCardsData,
      monsterCards: monsterCardsData,
    },
    currentTurn: "player",
    pendingMonsterEffect: null,
  };
}
