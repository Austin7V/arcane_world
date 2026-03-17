import { useEffect } from "react";
import { useRouter } from "next/router";
import BattleScreen from "../components/battle/BattleScreen";
import { useGame } from "../context/GameContext";

export default function BattlePage() {
  const router = useRouter();
  const { gameState, setGameState } = useGame();

  useEffect(() => {
    if (!gameState) {
      router.push("/");
    }
  }, [gameState, router]);

  if (!gameState) {
    return null;
  }

  return <BattleScreen gameState={gameState} setGameState={setGameState} />;
}
