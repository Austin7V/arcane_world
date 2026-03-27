export default function resolveMonsterTurn(gameState) {
  if (gameState.currentTurn !== "player") {
    return null;
  }

  if (gameState.currentMonster.deck.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * gameState.currentMonster.deck.length
  );

  const randomMonsterCard = gameState.currentMonster.deck[randomIndex];
  const randomActionType = Math.random() < 0.5 ? "strike" : "bite";

  const result = randomMonsterCard.play(gameState, randomActionType);

  if (!result) {
    return null;
  }

  return {
    ...result,
    nextGameState: {
      ...result.nextGameState,
      playedPlayerCardsOnTable: [],
      playedMonsterCardOnTable: randomMonsterCard,
      playedMonsterActionType: randomActionType,
    },
    logMessage: {
      type: randomActionType,
    },
  };
}
