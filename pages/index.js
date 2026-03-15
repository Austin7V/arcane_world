import { useRouter } from "next/router";
import StartScreen from "../components/StartScreen";
import createInitialGameState from "../lib/createInitialGameState";
import { useGame } from "../context/GameContext";

export default function HomePage() {
  const router = useRouter();
  const { setGameState } = useGame();

  function handleStartGame() {
    setGameState(createInitialGameState());
    router.push("/battle");
  }

  return <StartScreen onStartGame={handleStartGame} />;
}
