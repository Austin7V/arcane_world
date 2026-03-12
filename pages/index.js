import StartScreen from "../components/StartScreen";
import { useState } from "react";
import createInitialGameState from "../lib/createInitialGameState";
import BattleScreen from "@/components/BattleScreen";

export default function HomePage() {
  const [gameState, setGameState] = useState(null);

  function handleStartGame() {
    const newGameState = createInitialGameState();
    setGameState(newGameState);
  }

  if (!gameState) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  return <BattleScreen gameState={gameState} setGameState={setGameState} />;
}
