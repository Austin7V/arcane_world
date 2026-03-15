import styled from "styled-components";
import PlayerHand from "./PlayerHand";
import { useState } from "react";
import MonsterDeck from "./MonsterDeck";
import PlayerDeck from "./PlayerDeck";
import drawCardsToHand from "../lib/drawCardsToHand.js";
import applyMonsterStrike from "@/lib/applyMonsterStrike";

export default function BattleScreen({ gameState, setGameState }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const playerHP = gameState.player.deck.length + gameState.player.hand.length;
  const monsterHP = gameState.currentMonster.deck.length;

  function handleSelectCard(card) {
    setSelectedCard(card);
  }

  function handlePlayerCard() {
    if (!selectedCard) {
      return;
    }

    const updatedHand = gameState.player.hand.filter(
      (card) => card.id !== selectedCard.id
    );

    const updatedPlayerArmor = Math.min(
      4,
      gameState.player.armor + selectedCard.armor
    );

    const updatedMonsterDeck = gameState.currentMonster.deck.slice(
      selectedCard.damage
    );

    const updatedPendingDraw = gameState.player.pendingDraw + selectedCard.draw;

    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        hand: updatedHand,
        armor: updatedPlayerArmor,
        pendingDraw: updatedPendingDraw,
      },
      currentMonster: {
        ...gameState.currentMonster,
        deck: updatedMonsterDeck,
      },
    });

    setSelectedCard(null);
  }

  function handleResolveDraw() {
    const updatedPlayer = drawCardsToHand(gameState.player);

    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        hand: updatedPlayer.hand,
        deck: updatedPlayer.deck,
        pendingDraw: updatedPlayer.pendingDraw,
      },
    });
  }

  function handleMonsterTurn() {
    if (gameState.currentMonster.deck.length === 0) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * gameState.currentMonster.deck.length
    );

    const randomMonsterCard = gameState.currentMonster.deck[randomIndex];
    const strikeDamage = randomMonsterCard.actions.strike.damage;

    const updatedPlayer = applyMonsterStrike(gameState.player, strikeDamage);

    setGameState({
      ...gameState,
      player: {
        ...gameState.player,
        armor: updatedPlayer.armor,
        deck: updatedPlayer.deck,
        hand: updatedPlayer.hand,
      },
    });
  }

  return (
    <Wrapper>
      <MonsterArea>
        <SectionTitle>Monster</SectionTitle>
        <InfoText>Name: {gameState.currentMonster.name}</InfoText>
        <InfoText>HP: {monsterHP}</InfoText>
        <MonsterDeck cards={gameState.currentMonster.deck} />
      </MonsterArea>

      <BattleInfoArea>
        <SectionTitle>Battle Info</SectionTitle>
        <InfoText>
          Selected card: {selectedCard ? selectedCard.name : "None"}
        </InfoText>
        <PlayButton onClick={handlePlayerCard} disabled={!selectedCard}>
          Play Card
        </PlayButton>
        <PlayButton onClick={handleResolveDraw}>Resolve Draw</PlayButton>
        <PlayButton onClick={handleMonsterTurn}>Monster Turn</PlayButton>
      </BattleInfoArea>

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
