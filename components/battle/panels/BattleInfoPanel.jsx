import styled from "styled-components";

export default function BattleInfoPanel({
  selectedCard,
  currentTurn,
  pendingMonsterEffect,
  battleResult,
  onPlayCard,
  onEndTurn,
  isPlayCardDisabled,
  isEndTurnDisabled,
  victories,
  isBasicGameGoalReached,
}) {
  return (
    <Wrapper>
      <SectionTitle>Battle Info</SectionTitle>

      <InfoText>
        Selected card: {selectedCard ? selectedCard.name : "None"}
      </InfoText>

      <InfoText>Current turn: {currentTurn}</InfoText>
      <InfoText>
        Battle result: {battleResult ? battleResult : "In progress"}
      </InfoText>

      <InfoText>
        Active monster effect:{" "}
        {pendingMonsterEffect
          ? `${pendingMonsterEffect.effect} (${pendingMonsterEffect.value})`
          : "None"}
      </InfoText>
      <InfoText>Victories: {victories}</InfoText>
      <InfoText>
        Basic goal: {isBasicGameGoalReached ? "Reached" : "In progress"}
      </InfoText>
      <PlayButton onClick={onPlayCard} disabled={isPlayCardDisabled}>
        Play Card
      </PlayButton>

      <PlayButton onClick={onEndTurn} disabled={isEndTurnDisabled}>
        End Turn
      </PlayButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
`;

const InfoText = styled.p`
  margin: 0;
`;

const PlayButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
