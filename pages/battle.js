import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BattleScreen from "../components/battle/BattleScreen";
import { useGame } from "../context/GameContext";
import createPersistedGameState from "../lib/game/state/createPersistedGameState";
import createUserSyncPayload from "@/lib/users/createUserSyncPayload";
import syncUserToDatabase from "@/lib/users/syncUserToDatabase";

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
      if (!gameState) {
        return;
      }

      const requestBody = createUserSyncPayload(session?.user, {
        activeGameState: createPersistedGameState(gameState),
      });

      if (!requestBody) {
        return;
      }

      try {
        await syncUserToDatabase(requestBody);
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
