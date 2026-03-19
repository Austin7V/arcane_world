import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import BattleScreen from "../components/battle/BattleScreen";
import { useGame } from "../context/GameContext";
import createPersistedGameState from "@/lib/game/createPersistedGameState";

export default function BattlePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { gameState, setGameState } = useGame();

  useEffect(() => {
    if (!gameState) {
      router.push("/");
    }
  }, [gameState, router]);

  useEffect(() => {
    async function saveActiveGameState() {
      if (!session?.user?.email || !session?.user?.name || !gameState) {
        return;
      }

      try {
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleId: session.user.email,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || "",
            activeGameState: createPersistedGameState(gameState),
            totalWins: gameState.victories,
            currentStage: gameState.victories + 1,
          }),
        });
      } catch (error) {
        console.error("Failed to save active game state:", error);
      }
    }

    saveActiveGameState();
  }, [session, gameState]);

  if (!gameState) {
    return null;
  }

  return <BattleScreen gameState={gameState} setGameState={setGameState} />;
}
