import createInitialGameState from "./createInitialGameState";

export default function createNextBattleState(currentGameState) {
  const newBattleState = createInitialGameState();

  return {
    ...newBattleState,
    victories: currentGameState.victories,
  };
}
