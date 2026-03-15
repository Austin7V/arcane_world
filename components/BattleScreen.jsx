import styled from "styled-components";
import PlayerHand from "./PlayerHand";
import { useState } from "react";
import MonsterDeck from "./MonsterDeck";
import PlayerDeck from "./PlayerDeck";
import drawCardsToHand from "../lib/drawCardsToHand.js";
import applyMonsterStrike from "@/lib/applyMonsterStrike";
import BattleLog from "./BattleLog";
import BattleInfoPanel from "./BattleInfoPanel";
import resolvePlayerCardPlay from "@/lib/resolvePlayerCardPlay";

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
    const result = resolvePlayerCardPlay(gameState, selectedCard);

    if (!result) {
      return;
    }

    setGameState(result.nextGameState);
    addBattleLogMessage(result.logMessage);
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
        <BattleInfoPanel
          selectedCard={selectedCard}
          currentTurn={gameState.currentTurn}
          pendingMonsterEffect={gameState.pendingMonsterEffect}
          onPlayCard={handlePlayerCard}
          onEndTurn={handleEndTurn}
          isPlayCardDisabled={
            !selectedCard || gameState.currentTurn !== "player"
          }
          isEndTurnDisabled={gameState.currentTurn !== "player"}
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
