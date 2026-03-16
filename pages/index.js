import { useRouter } from "next/router";
import StartScreen from "../components/StartScreen";
import createInitialGameState from "../lib/game/createInitialGameState";
import { useGame } from "../context/GameContext";
import createNextBattleState from "../lib/game/createNextBattleState";
import getBattleResult from "../lib/game/getBattleResult";

export default function HomePage() {
  const router = useRouter();
  const { gameState, setGameState } = useGame();

  function handleStartGame() {
    setGameState(createInitialGameState());
    router.push("/battle");
  }

  function handleContinueGame() {
    if (!gameState) {
      return;
    }

    const battleResult = getBattleResult(gameState);
    const isBasicGameGoalReached = gameState.victories >= 3;

    if (battleResult === "victory" && !isBasicGameGoalReached) {
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
      hasSavedGame={Boolean(gameState)}
    />
  );
}
