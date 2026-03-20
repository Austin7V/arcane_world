export default function resolvePlayerCardPlay(gameState, selectedCard) {
  if (!selectedCard) {
    return null;
  }

  const nextGameState = selectedCard.play(gameState);

  return {
    nextGameState,
    logMessage: `Player used ${selectedCard.name}`,
  };
}
