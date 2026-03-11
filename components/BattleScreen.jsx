import styled from "styled-components";
import PlayerHand from "./PlayerHand";
import { useState } from "react";

export default function BattleScreen({ gameState }) {
  const [selectedCard, setSelectedCard] = useState(null);

  function handleSelectCard(card) {
    setSelectedCard(card);
  }

  return (
    <Wrapper>
      <MonsterArea>
        <SectionTitle>Monster</SectionTitle>
        <InfoText>Name: {gameState.currentMonster.name}</InfoText>
        <InfoText>HP: {gameState.currentMonster.hp}</InfoText>
        <InfoText>Cards: {gameState.currentMonster.deck.length}</InfoText>
      </MonsterArea>

      <BattleInfoArea>
        <SectionTitle>Battle Info</SectionTitle>
        <InfoText>The battle has started.</InfoText>
        <InfoText>
          Selected card: {selectedCard ? selectedCard.name : "None"}
        </InfoText>
      </BattleInfoArea>

      <PlayerArea>
        <SectionTitle>Player</SectionTitle>
        <InfoText>Name: {gameState.player.name}</InfoText>
        <InfoText>HP: {gameState.player.hp}</InfoText>
        <InfoText>Hand: {gameState.player.hand.length}</InfoText>
        <InfoText>Deck: {gameState.player.deck.length}</InfoText>
      </PlayerArea>
      <PlayerHand
        cards={gameState.player.hand}
        onSelectCard={handleSelectCard}
        selectedCard={selectedCard}
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

const BattleInfoArea = styled.div`
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
