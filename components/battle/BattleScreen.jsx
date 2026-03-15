import styled from "styled-components";
import PlayerHand from "./PlayerHand";
import { useState } from "react";
import MonsterDeck from "./MonsterDeck";
import PlayerDeck from "./PlayerDeck";
import BattleLog from "./BattleLog";
import BattleInfoPanel from "./BattleInfoPanel";
import resolvePlayerCardPlay from "@/lib/game/resolvePlayerCardPlay";
import resolveMonsterTurn from "@/lib/game/resolveMonsterTurn";
import getBattleResult from "@/lib/game/getBattleResult";
import BattleResultOverlay from "./BattleResultOverlay";

export default function BattleScreen({ gameState, setGameState }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [battleLogMessages, setBattleLogMessages] = useState([]);

  function addBattleLogMessage(message) {
    setBattleLogMessages((previousMessages) => [message, ...previousMessages]);
  }

  const playerHP = gameState.player.deck.length + gameState.player.hand.length;
  const monsterHP = gameState.currentMonster.deck.length;
  const battleResult = getBattleResult(gameState);

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
        <InfoText>HP: {playerHP}</InfoText>
        <InfoText>Armor: {gameState.player.armor}</InfoText>
        <PlayerDeck cards={gameState.player.deck} />
      </PlayerArea>
      <PlayerHand
        cards={gameState.player.hand}
        onSelectCard={handleSelectCard}
        selectedCard={selectedCard}
      />
      <BattleResultOverlay battleResult={battleResult} />
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
