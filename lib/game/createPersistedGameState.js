export default function createPersistedGameState(gameState) {
  if (!gameState) {
    return null;
  }

  return {
    runStarted: gameState.runStarted,
    player: gameState.player,
    currentMonster: gameState.currentMonster,
    battleResult: gameState.battleResult,
    victories: gameState.victories,
    currentTurn: gameState.currentTurn,
    pendingMonsterEffect: gameState.pendingMonsterEffect,
  };
}
