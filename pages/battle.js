import { useEffect } from "react";
import { useRouter } from "next/router";
import BattleScreen from "../components/battle/BattleScreen";
import { useGame } from "../context/GameContext";

export default function BattlePage() {
  const router = useRouter();
  const { gameState, setGameState, isGameStateHydrated } = useGame();

  useEffect(() => {
    if (!isGameStateHydrated) {
      return;
    }

    if (!gameState) {
      router.push("/");
    }
  }, [gameState, isGameStateHydrated, router]);

  if (!isGameStateHydrated) {
    return null;
  }

  if (!gameState) {
    return null;
  }

  return <BattleScreen gameState={gameState} setGameState={setGameState} />;
}
