import { useRouter } from "next/router";
import StartScreen from "../components/StartScreen";
import createInitialGameState from "../lib/game/createInitialGameState";
import { useGame } from "../context/GameContext";
import createNextBattleState from "../lib/game/createNextBattleState";
import getBattleResult from "../lib/game/getBattleResult";

export default function HomePage() {
  const router = useRouter();
  const { gameState, setGameState } = useGame();
  const battleResult = gameState ? getBattleResult(gameState) : null;
  const isBasicGameGoalReached = gameState ? gameState.victories >= 3 : false;
  const hasContinuableGame = Boolean(gameState) && !isBasicGameGoalReached;

  function handleStartGame() {
    setGameState(createInitialGameState());
    router.push("/battle");
  }

  function handleContinueGame() {
    if (!gameState || isBasicGameGoalReached) {
      return;
    }

    if (battleResult === "victory") {
      const nextBattleState = createNextBattleState(gameState);
      setGameState(nextBattleState);
      router.push("/battle");
      return;
    }

    router.push("/battle");
  }

  return (
    <StartScreen
      onStartGame={handleStartGame}
      onContinueGame={handleContinueGame}
      hasSavedGame={hasContinuableGame}
    />
  );
}
