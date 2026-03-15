import styled from "styled-components";
import PlayerHand from "./PlayerHand";
import { useState } from "react";
import MonsterDeck from "./MonsterDeck";
import PlayerDeck from "./PlayerDeck";
import drawCardsToHand from "../lib/drawCardsToHand.js";
import applyMonsterStrike from "@/lib/applyMonsterStrike";
import BattleLog from "./BattleLog";

export default function BattleScreen({ gameState, setGameState }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [battleLogMessages, setBattleLogMessages] = useState([]);

  function addBattleLogMessage(message) {
    setBattleLogMessages((previousMessages) => [message, ...previousMessages]);
  }

  const playerHP = gameState.player.deck.length + gameState.player.hand.length;
  const monsterHP = gameState.currentMonster.deck.length;

  function handleSelectCard(card) {
    setSelectedCard(card);
  }

  function handlePlayerCard() {
    if (!selectedCard) {
      return;
    }

    let effectiveDamage = selectedCard.damage;

    if (gameState.pendingMonsterEffect?.effect === "playerMaxDamageNextTurn") {
      effectiveDamage = Math.min(
        selectedCard.damage,
        gameState.pendingMonsterEffect.value
      );
    }

    const updatedHand = gameState.player.hand.filter(
      (card) => card.id !== selectedCard.id
    );

    const updatedPlayerArmor = Math.min(
      4,
      gameState.player.armor + selectedCard.armor
    );

    const updatedMonsterDeck =
      gameState.currentMonster.deck.slice(effectiveDamage);

    const updatedPendingDraw = gameState.player.pendingDraw + selectedCard.draw;

    setGameState({
      ...gameState,
      pendingMonsterEffect: null,
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

    addBattleLogMessage(
      `Player used ${selectedCard.name} (damage: ${effectiveDamage}, armor: ${selectedCard.armor}, draw: ${selectedCard.draw})`
    );

    setSelectedCard(null);
  }

  function handleEndTurn() {
    if (gameState.currentTurn !== "player") {
      return;
    }

    if (gameState.currentMonster.deck.length === 0) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * gameState.currentMonster.deck.length
    );

    const randomMonsterCard = gameState.currentMonster.deck[randomIndex];
    const randomActionType = Math.random() < 0.5 ? "strike" : "bite";

    const updatedMonsterDeck = gameState.currentMonster.deck.filter(
      (_, index) => index !== randomIndex
    );

    if (randomActionType === "strike") {
      const strikeDamage = randomMonsterCard.actions.strike.damage;

      const updatedPlayerAfterStrike = applyMonsterStrike(
        gameState.player,
        strikeDamage
      );

      const updatedPlayerAfterDraw = drawCardsToHand({
        ...updatedPlayerAfterStrike,
        pendingDraw: gameState.player.pendingDraw,
      });

      setGameState({
        ...gameState,
        currentTurn: "player",
        pendingMonsterEffect: null,
        player: {
          ...gameState.player,
          armor: updatedPlayerAfterDraw.armor,
          hand: updatedPlayerAfterDraw.hand,
          deck: updatedPlayerAfterDraw.deck,
          pendingDraw: updatedPlayerAfterDraw.pendingDraw,
        },
        currentMonster: {
          ...gameState.currentMonster,
          deck: updatedMonsterDeck,
        },
      });

      addBattleLogMessage(
        `Monster used ${randomMonsterCard.name} with Strike for ${strikeDamage} damage`
      );
    }

    if (randomActionType === "bite") {
      const biteEffect = randomMonsterCard.actions.bite;

      const updatedPlayerAfterDraw = drawCardsToHand({
        ...gameState.player,
      });

      setGameState({
        ...gameState,
        currentTurn: "player",
        pendingMonsterEffect: biteEffect,
        player: {
          ...gameState.player,
          hand: updatedPlayerAfterDraw.hand,
          deck: updatedPlayerAfterDraw.deck,
          pendingDraw: updatedPlayerAfterDraw.pendingDraw,
        },
        currentMonster: {
          ...gameState.currentMonster,
          deck: updatedMonsterDeck,
        },
      });

      addBattleLogMessage(
        `Monster used ${randomMonsterCard.name} with Bite (${biteEffect.effect})`
      );
    }

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
        <BattleInfoArea>
          <SectionTitle>Battle Info</SectionTitle>
          <InfoText>
            Selected card: {selectedCard ? selectedCard.name : "None"}
          </InfoText>
          <InfoText>Current turn: {gameState.currentTurn}</InfoText>
          <PlayButton
            onClick={handlePlayerCard}
            disabled={!selectedCard || gameState.currentTurn !== "player"}
          >
            Play Card
          </PlayButton>
          <PlayButton
            onClick={handleEndTurn}
            disabled={gameState.currentTurn !== "player"}
          >
            End Turn
          </PlayButton>
        </BattleInfoArea>
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

const CenterArea = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 16px;
  align-items: stretch;
`;
