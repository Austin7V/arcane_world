import createInitialGameState from "./createInitialGameState";

export default function createNextBattleState(currentGameState) {
  const newBattleState = createInitialGameState(currentGameState.player.name);

  return {
    ...newBattleState,
    victories: currentGameState.victories,
  };
}
