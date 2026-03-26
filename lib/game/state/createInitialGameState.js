import playerCardsData from "../cards/playerCardsData";
import monsterCardsData from "../cards/monsterCardsData";
import monsterData from "../../data/monsterData";

export default function createInitialGameState(playerName = "Player") {
  const starterDeck = [...playerCardsData];
  const schuffleDeck = [...starterDeck].sort(() => Math.random() - 0.5);
  const startingHand = schuffleDeck.slice(0, 3);
  const remainingDeck = schuffleDeck.slice(3);

  const randomMonster =
    monsterData[Math.floor(Math.random() * monsterData.length)];

  const monsterDeck = [];
  for (let index = 0; index < randomMonster.hp; index += 1) {
    const randomCard =
      monsterCardsData[Math.floor(Math.random() * monsterCardsData.length)];
    monsterDeck.push(randomCard);
  }

  return {
    player: {
      name: playerName,
      armor: 1,
      hand: startingHand,
      deck: remainingDeck,
      pendingDraw: 0,
    },
    currentMonster: { ...randomMonster, deck: monsterDeck },
    battleResult: null,
    victories: 0,
    currentTurn: "player",
    pendingMonsterEffect: null,
    playedPlayerCardsOnTable: [],
    playedMonsterCardOnTable: null,
    playedMonsterActionType: null,
  };
}
