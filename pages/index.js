import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import StartScreen from "../components/StartScreen";
import createInitialGameState from "../lib/game/createInitialGameState";
import { useGame } from "../context/GameContext";
import createNextBattleState from "../lib/game/createNextBattleState";
import getBattleResult from "../lib/game/getBattleResult";
import createPersistedGameState from "../lib/game/createPersistedGameState";

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
  const hasContinuableGame = Boolean(gameState) && !isBasicGameGoalReached;

  async function handleStartGame() {
    if (!session?.user?.email || !session?.user?.name) {
      return;
    }
    const newGameState = createInitialGameState();

    setGameState(newGameState);

    if (session?.user?.email && session?.user?.name) {
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
            activeGameState: createPersistedGameState(newGameState),
          }),
        });
      } catch (error) {
        console.error("Failed to save new game state:", error);
      }
    }

    router.push("/battle");
  }

  async function handleContinueGame() {
    if (!gameState || isBasicGameGoalReached) {
      return;
    }

    if (battleResult === "victory") {
      const nextBattleState = createNextBattleState(gameState);
      setGameState(nextBattleState);

      if (session?.user?.email && session?.user?.name) {
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
              activeGameState: createPersistedGameState(nextBattleState),
            }),
          });
        } catch (error) {
          console.error("Failed to save continued game state:", error);
        }
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
    />
  );
}
