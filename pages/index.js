import StartScreen from "../components/StartScreen";
import { useState } from "react";
import createInitialGameState from "../lib/createInitialGameState";
import GameScreenPlaceholder from "@/components/GameScreenPlaceholder";

export default function HomePage() {
  const [gameState, setGameState] = useState(null);

  function handleStartGame() {
    const newGameState = createInitialGameState();
    setGameState(newGameState);
  }

  if (!gameState) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  return <GameScreenPlaceholder gameState={gameState} />;
}
