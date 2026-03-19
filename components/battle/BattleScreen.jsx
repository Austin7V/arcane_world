import styled from "styled-components";
import PlayerHand from "./PlayerHand";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import MonsterDeck from "./MonsterDeck";
import PlayerDeck from "./PlayerDeck";
import BattleLog from "./BattleLog";
import BattleInfoPanel from "./BattleInfoPanel";
import resolvePlayerCardPlay from "@/lib/game/resolvePlayerCardPlay";
import resolveMonsterTurn from "@/lib/game/resolveMonsterTurn";
import getBattleResult from "@/lib/game/getBattleResult";
import BattleResultOverlay from "./BattleResultOverlay";
import createNextBattleState from "@/lib/game/createNextBattleState";
import createUserSyncPayload from "@/lib/users/createUserSyncPayload";
import syncUserToDatabase from "@/lib/users/syncUserToDatabase";

export default function BattleScreen({ gameState, setGameState }) {
  const { data: session } = useSession();
  const [selectedCard, setSelectedCard] = useState(null);
  const [battleLogMessages, setBattleLogMessages] = useState([]);
  const previousBattleResultRef = useRef(null);

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

  function addBattleLogMessage(message) {
    setBattleLogMessages((previousMessages) => [message, ...previousMessages]);
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

  const playerHP = gameState.player.deck.length + gameState.player.hand.length;
  const monsterHP = gameState.currentMonster.deck.length;
  const battleResult = getBattleResult(gameState);
  const isBasicGameGoalReached = gameState.victories >= 3;

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

  function handleSelectCard(card) {
    setSelectedCard(card);
  }

  function handlePlayerCard() {
    if (battleResult) {
      return;
    }

    const result = resolvePlayerCardPlay(gameState, selectedCard);

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

  return (
    <Wrapper>
      <MonsterArea>
        <SectionTitle>Monster</SectionTitle>
        <InfoText>Name: {gameState.currentMonster.name}</InfoText>
        <InfoText>HP: {monsterHP}</InfoText>
        <MonsterDeck cards={gameState.currentMonster.deck} />
      </MonsterArea>

      <CenterArea>
        <BattleLog messages={battleLogMessages} />
        <BattleInfoPanel
          selectedCard={selectedCard}
          currentTurn={gameState.currentTurn}
          pendingMonsterEffect={gameState.pendingMonsterEffect}
          battleResult={battleResult}
          victories={gameState.victories}
          isBasicGameGoalReached={isBasicGameGoalReached}
          onPlayCard={handlePlayerCard}
          onEndTurn={handleEndTurn}
          isPlayCardDisabled={
            !selectedCard ||
            gameState.currentTurn !== "player" ||
            battleResult !== null
          }
          isEndTurnDisabled={
            gameState.currentTurn !== "player" || battleResult !== null
          }
        />
      </CenterArea>
      <PlayerArea>
        <SectionTitle>Player</SectionTitle>
        <InfoText>Name: {gameState.player.name}</InfoText>
        <InfoText>Victories: {gameState.victories}</InfoText>
        <InfoText>HP: {playerHP}</InfoText>
        <InfoText>Armor: {gameState.player.armor}</InfoText>
        <PlayerDeck cards={gameState.player.deck} />
      </PlayerArea>
      <PlayerHand
        cards={gameState.player.hand}
        onSelectCard={handleSelectCard}
        selectedCard={selectedCard}
      />
      <BattleResultOverlay
        battleResult={battleResult}
        isBasicGameGoalReached={isBasicGameGoalReached}
        onNextBattle={handleNextBattle}
        onReset={handleResetGame}
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  gap: 16px;
  padding: 24px;
`;

const MonsterArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const PlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
`;

const InfoText = styled.p`
  margin: 0;
`;

const CenterArea = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: stretch;
`;
