import { useRouter } from "next/router";
import StartScreen from "../components/StartScreen";
import createInitialGameState from "../lib/game/createInitialGameState";
import { useGame } from "../context/GameContext";

export default function HomePage() {
  const router = useRouter();
  const { gameState, setGameState } = useGame();

  function handleStartGame() {
    setGameState(createInitialGameState());
    router.push("/battle");
  }

  function handleContinueGame() {
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
