export function createAttackCardPlay(cardDamage) {
  return function play(gameState) {
    let effectiveDamage = cardDamage;
    let nextPendingMonsterEffect = gameState.pendingMonsterEffect;

    if (gameState.pendingMonsterEffect?.effect === "playerMaxDamageNextTurn") {
      effectiveDamage = Math.min(
        cardDamage,
        gameState.pendingMonsterEffect.value
      );
      nextPendingMonsterEffect = null;
    }

    const updatedHand = gameState.player.hand.filter(
      (card) => card.id !== this.id
    );

    const updatedMonsterDeck =
      gameState.currentMonster.deck.slice(effectiveDamage);

    return {
      ...gameState,
      pendingMonsterEffect: nextPendingMonsterEffect,
      player: {
        ...gameState.player,
        hand: updatedHand,
      },
      currentMonster: {
        ...gameState.currentMonster,
        deck: updatedMonsterDeck,
      },
    };
  };
}

export function createArmorCardPlay(cardArmor) {
  return function play(gameState) {
    let effectiveArmorGain = cardArmor;
    let nextPendingMonsterEffect = gameState.pendingMonsterEffect;

    if (gameState.pendingMonsterEffect?.effect === "blockArmorGainNextTurn") {
      effectiveArmorGain = 0;
      nextPendingMonsterEffect = null;
    }

    const updatedHand = gameState.player.hand.filter(
      (card) => card.id !== this.id
    );

    const updatedPlayerArmor = Math.min(
      4,
      gameState.player.armor + effectiveArmorGain
    );

    return {
      ...gameState,
      pendingMonsterEffect: nextPendingMonsterEffect,
      player: {
        ...gameState.player,
        hand: updatedHand,
        armor: updatedPlayerArmor,
      },
    };
  };
}

export function createDrawCardPlay(cardDraw) {
  return function play(gameState) {
    const updatedHand = gameState.player.hand.filter(
      (card) => card.id !== this.id
    );

    const updatedPendingDraw = gameState.player.pendingDraw + cardDraw;

    return {
      ...gameState,
      player: {
        ...gameState.player,
        hand: updatedHand,
        pendingDraw: updatedPendingDraw,
      },
    };
  };
}
