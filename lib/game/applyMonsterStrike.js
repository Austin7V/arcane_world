export default function applyMonsterStrike(
  player,
  damage,
  ignoreArmor = false
) {
  let updatedArmor = player.armor;
  let updatedDeck = [...player.deck];
  let updatedHand = [...player.hand];

  let remainingDamage = damage;

  if (!ignoreArmor) {
    if (remainingDamage <= updatedArmor) {
      updatedArmor -= remainingDamage;

      return {
        armor: updatedArmor,
        deck: updatedDeck,
        hand: updatedHand,
      };
    }

    remainingDamage -= updatedArmor;
    updatedArmor = 0;
  }

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
