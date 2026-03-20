import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import StartScreen from "../components/StartScreen";
import createInitialGameState from "../lib/game/state/createInitialGameState";
import createNextBattleState from "../lib/game/state/createNextBattleState";
import createPersistedGameState from "../lib/game/state/createPersistedGameState";
import { useGame } from "../context/GameContext";
import getBattleResult from "../lib/game/rules/getBattleResult";
import createUserSyncPayload from "@/lib/users/createUserSyncPayload";
import syncUserToDatabase from "@/lib/users/syncUserToDatabase";
export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { gameState, setGameState } = useGame();

  useEffect(() => {
    async function loadActiveGameState() {
      if (!session?.user?.email) {
        return;
      }
      if (gameState) {
        return;
      }
      try {
        const response = await fetch(
          `/api/users?googleId=${encodeURIComponent(session.user.email)}`
        );
        if (!response.ok) {
          return;
        }
        const data = await response.json();

        if (data.user?.activeGameState) {
          setGameState(data.user.activeGameState);
        }
      } catch (error) {
        console.error("Failed to load active game state:", error);
      }
    }

    loadActiveGameState();
  }, [session, gameState, setGameState]);

  const battleResult = gameState ? getBattleResult(gameState) : null;
  const isBasicGameGoalReached = gameState ? gameState.victories >= 3 : false;
  const isAuthenticated = Boolean(session?.user?.email && session?.user?.name);
  const hasContinuableGame =
    isAuthenticated && Boolean(gameState) && !isBasicGameGoalReached;

  async function handleStartGame() {
    if (!session?.user?.email || !session?.user?.name) {
      return;
    }
    const newGameState = createInitialGameState(session.user.name);
    setGameState(newGameState);
    try {
      const requestBody = createUserSyncPayload(session.user, {
        activeGameState: createPersistedGameState(newGameState),
      });

      await syncUserToDatabase(requestBody);
    } catch (error) {
      console.error("Failed to save new game state:", error);
    }

    router.push("/battle");
  }

  async function handleContinueGame() {
    if (!session?.user?.email || !session?.user?.name) {
      return;
    }

    if (!gameState || isBasicGameGoalReached) {
      return;
    }

    if (battleResult === "victory") {
      const nextBattleState = createNextBattleState(gameState);
      setGameState(nextBattleState);

      try {
        const requestBody = createUserSyncPayload(session.user, {
          activeGameState: createPersistedGameState(nextBattleState),
        });

        await syncUserToDatabase(requestBody);
      } catch (error) {
        console.error("Failed to save continued game state:", error);
      }

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
      isAuthenticated={isAuthenticated}
    />
  );
}
