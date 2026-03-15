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
    let effectiveArmorGain = selectedCard.armor;
    let nextPendingMonsterEffect = gameState.pendingMonsterEffect;

    if (gameState.pendingMonsterEffect?.effect === "playerMaxDamageNextTurn") {
      effectiveDamage = Math.min(
        selectedCard.damage,
        gameState.pendingMonsterEffect.value
      );
      nextPendingMonsterEffect = null;
    }

    if (gameState.pendingMonsterEffect?.effect === "blockArmorGainNextTurn") {
      effectiveArmorGain = 0;
      nextPendingMonsterEffect = null;
    }

    const updatedHand = gameState.player.hand.filter(
      (card) => card.id !== selectedCard.id
    );

    const updatedPlayerArmor = Math.min(
      4,
      gameState.player.armor + effectiveArmorGain
    );

    const updatedMonsterDeck =
      gameState.currentMonster.deck.slice(effectiveDamage);

    const updatedPendingDraw = gameState.player.pendingDraw + selectedCard.draw;

    setGameState({
      ...gameState,
      pendingMonsterEffect: nextPendingMonsterEffect,
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
      `Player used ${selectedCard.name} (damage: ${effectiveDamage}, armor: ${effectiveArmorGain}, draw: ${selectedCard.draw})`
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

      const shouldIgnoreArmor =
        gameState.pendingMonsterEffect?.effect === "ignoreArmorNextTurn";

      const nextPendingMonsterEffect = shouldIgnoreArmor
        ? null
        : gameState.pendingMonsterEffect;

      const updatedPlayerAfterStrike = applyMonsterStrike(
        gameState.player,
        strikeDamage,
        shouldIgnoreArmor
      );

      const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayerAfterStrike);

      setGameState({
        ...gameState,
        currentTurn: "player",
        pendingMonsterEffect: nextPendingMonsterEffect,
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

      let updatedPlayer = {
        ...gameState.player,
      };

      let nextPendingMonsterEffect = biteEffect;
      let biteLogMessage = `Monster used ${randomMonsterCard.name} with Bite (${biteEffect.effect})`;

      if (biteEffect.effect === "discardRandomCard") {
        if (updatedPlayer.hand.length > 0) {
          const discardIndex = Math.floor(
            Math.random() * updatedPlayer.hand.length
          );
          const discardedCard = updatedPlayer.hand[discardIndex];

          updatedPlayer.hand = updatedPlayer.hand.filter(
            (_, index) => index !== discardIndex
          );

          biteLogMessage = `Monster used ${randomMonsterCard.name} with Bite and discarded ${discardedCard.name}`;
        }

        nextPendingMonsterEffect = null;
      }

      const drawPenalty =
        biteEffect.effect === "playerDrawReductionNextTurn"
          ? biteEffect.value
          : 0;

      const updatedPlayerAfterDraw = drawCardsToHand(
        updatedPlayer,
        drawPenalty
      );

      if (biteEffect.effect === "playerDrawReductionNextTurn") {
        nextPendingMonsterEffect = null;
      }

      setGameState({
        ...gameState,
        currentTurn: "player",
        pendingMonsterEffect: nextPendingMonsterEffect,
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

      addBattleLogMessage(biteLogMessage);
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
          <InfoText>
            Active monster effect:{" "}
            {gameState.pendingMonsterEffect
              ? `${gameState.pendingMonsterEffect.effect} (${gameState.pendingMonsterEffect.value})`
              : "None"}
          </InfoText>
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
