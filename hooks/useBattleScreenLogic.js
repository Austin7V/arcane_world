import { useEffect, useRef, useState } from "react";
import resolvePlayerCardPlay from "@/lib/game/resolvers/resolvePlayerCardPlay";
import resolveMonsterTurn from "@/lib/game/resolvers/resolveMonsterTurn";
import getBattleResult from "@/lib/game/rules/getBattleResult";
import createNextBattleState from "@/lib/game/state/createNextBattleState";
import createUserSyncPayload from "@/lib/users/createUserSyncPayload";
import syncUserToDatabase from "@/lib/users/syncUserToDatabase";

export default function useBattleScreenLogic({
  gameState,
  setGameState,
  session,
}) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [battleLogMessages, setBattleLogMessages] = useState([]);
  const previousBattleResultRef = useRef(null);

  const playerHP = gameState.player.deck.length + gameState.player.hand.length;
  const monsterHP = gameState.currentMonster.deck.length;
  const battleResult = getBattleResult(gameState);
  const isBasicGameGoalReached = gameState.victories >= 3;

  function addBattleLogMessage(logEntry) {
    setBattleLogMessages((previousMessages) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        type: logEntry.type,
      },
      ...previousMessages,
    ]);
  }

  function handleSelectCard(card) {
    setSelectedCard(card);
  }

  function handleNextBattle() {
    const nextBattleState = createNextBattleState(gameState);
    setGameState(nextBattleState);
  }

  async function handleResetGame() {
    try {
      const requestBody = createUserSyncPayload(session?.user, {
        activeGameState: null,
      });

      if (!requestBody) {
        setGameState(null);
        return;
      }

      if (battleResult === "defeat") {
        requestBody.incrementLosses = true;
        requestBody.currentStage = 1;
      }

      await syncUserToDatabase(requestBody);
    } catch (error) {
      console.error("Failed to reset saved game progress:", error);
    }

    setGameState(null);
  }

  async function saveVictoryProgress() {
    try {
      const requestBody = createUserSyncPayload(session?.user, {
        incrementWins: true,
        currentStage: gameState.victories + 2,
      });

      if (!requestBody) {
        return;
      }

      await syncUserToDatabase(requestBody);
    } catch (error) {
      console.error("Failed to save victory progress:", error);
    }
  }

  useEffect(() => {
    if (
      battleResult === "victory" &&
      previousBattleResultRef.current !== "victory"
    ) {
      setGameState((previousGameState) => ({
        ...previousGameState,
        victories: previousGameState.victories + 1,
      }));

      saveVictoryProgress();
    }

    previousBattleResultRef.current = battleResult;
  }, [battleResult, setGameState]);

  function handlePlayerCard(cardToPlay = selectedCard) {
    if (battleResult) {
      return;
    }

    if (!cardToPlay) {
      return;
    }

    const result = resolvePlayerCardPlay(gameState, cardToPlay);

    if (!result) {
      return;
    }

    setGameState(result.nextGameState);
    addBattleLogMessage(result.logMessage);
    setSelectedCard(null);
  }

  function handleEndTurn() {
    if (battleResult) {
      return;
    }

    const result = resolveMonsterTurn(gameState);

    if (!result) {
      return;
    }

    setGameState(result.nextGameState);
    addBattleLogMessage(result.logMessage);
    setSelectedCard(null);
  }

  return {
    selectedCard,
    battleLogMessages,
    playerHP,
    monsterHP,
    battleResult,
    isBasicGameGoalReached,
    handleSelectCard,
    handlePlayerCard,
    handleEndTurn,
    handleNextBattle,
    handleResetGame,
  };
}
