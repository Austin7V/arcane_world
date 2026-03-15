export default function resolvePlayerCardPlay(gameState, selectedCard) {
  if (!selectedCard) {
    return null;
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

  return {
    nextGameState: {
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
    },
    logMessage: `Player used ${selectedCard.name} (damage: ${effectiveDamage}, armor: ${effectiveArmorGain}, draw: ${selectedCard.draw})`,
  };
}
