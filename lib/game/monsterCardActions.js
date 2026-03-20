import applyMonsterStrike from "./applyMonsterStrike";
import drawCardsToHand from "./drawCardsToHand";

export function playMonsterStrike(gameState, monsterCard, strikeDamage) {
  const updatedMonsterDeck = monsterCard.removeSelfFromMonsterDeck(gameState);

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

  const updatedPlayerAfterDraw = drawCardsToHand({
    ...updatedPlayerAfterStrike,
    pendingDraw: gameState.player.pendingDraw,
  });

  return {
    nextGameState: {
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
    },
    logMessage: `Monster used ${monsterCard.name} with Strike for ${strikeDamage} damage`,
  };
}

export function playMonsterEffectBite(gameState, monsterCard, biteEffect) {
  const updatedMonsterDeck = monsterCard.removeSelfFromMonsterDeck(gameState);
  const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

  return {
    nextGameState: {
      ...gameState,
      currentTurn: "player",
      pendingMonsterEffect: biteEffect,
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
    },
    logMessage: `Monster used ${monsterCard.name} with Bite (${biteEffect.effect})`,
  };
}

export function playMonsterDiscardBite(gameState, monsterCard) {
  const updatedMonsterDeck = monsterCard.removeSelfFromMonsterDeck(gameState);

  let updatedPlayer = {
    ...gameState.player,
  };

  let biteLogMessage = `Monster used ${monsterCard.name} with Bite (discardRandomCard)`;

  if (updatedPlayer.hand.length > 0) {
    const discardIndex = Math.floor(Math.random() * updatedPlayer.hand.length);
    const discardedCard = updatedPlayer.hand[discardIndex];

    updatedPlayer.hand = updatedPlayer.hand.filter(
      (_, index) => index !== discardIndex
    );

    biteLogMessage = `Monster used ${monsterCard.name} with Bite and discarded ${discardedCard.name}`;
  }

  const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayer, 0);

  return {
    nextGameState: {
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
    },
    logMessage: biteLogMessage,
  };
}

export function playMonsterDrawReductionBite(
  gameState,
  monsterCard,
  biteEffect
) {
  const updatedMonsterDeck = monsterCard.removeSelfFromMonsterDeck(gameState);
  const updatedPlayerAfterDraw = drawCardsToHand(
    gameState.player,
    biteEffect.value
  );

  return {
    nextGameState: {
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
    },
    logMessage: `Monster used ${monsterCard.name} with Bite (${biteEffect.effect})`,
  };
}
