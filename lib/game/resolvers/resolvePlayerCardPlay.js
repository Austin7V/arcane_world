export default function resolvePlayerCardPlay(gameState, selectedCard) {
  if (!selectedCard) {
    return null;
  }

  const alreadyPlayedCardsCount = gameState.playedPlayerCardsOnTable.length;

  if (alreadyPlayedCardsCount >= 4) {
    return null;
  }

  const playedGameState = selectedCard.play(gameState);

  const nextPlayedPlayerCards = [
    ...playedGameState.playedPlayerCardsOnTable,
    selectedCard,
  ];

  const nextGameState = {
    ...playedGameState,
    playedPlayerCardsOnTable: nextPlayedPlayerCards,
    playedMonsterCardOnTable: null,
  };

  return {
    nextGameState,
    logMessage: `Player used ${selectedCard.name}`,
  };
}
