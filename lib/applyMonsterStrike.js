export default function applyMonsterStrike(player, damage) {
  let updatedArmor = player.armor;
  let updatedDeck = [...player.deck];
  let updatedHand = [...player.hand];

  if (damage <= updatedArmor) {
    updatedArmor -= damage;
    return {
      armor: updatedArmor,
      deck: updatedDeck,
      hand: updatedHand,
    };
  }

  const remainingDamage = damage - updatedArmor;
  updatedArmor = 0;

  const deckCardsToRemove = Math.min(remainingDamage, updatedDeck.length);
  updatedDeck = updatedDeck.slice(deckCardsToRemove);

  const damageLeftAfterDeck = remainingDamage - deckCardsToRemove;

  if (damageLeftAfterDeck > 0) {
    const handCardsToRemove = Math.min(damageLeftAfterDeck, updatedHand.length);
    updatedHand = updatedHand.slice(handCardsToRemove);
  }

  return {
    armor: updatedArmor,
    deck: updatedDeck,
    hand: updatedHand,
  };
}
