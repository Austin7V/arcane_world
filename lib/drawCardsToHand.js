export default function drawCardsToHand(player) {
  let updatedHand = [...player.hand];
  let updatedDeck = [...player.deck];

  const cardsNeededToReachThree = Math.max(0, 3 - updatedHand.length);
  const baseDrawCount = Math.min(cardsNeededToReachThree, updatedDeck.length);

  const baseDrawnCards = updatedDeck.slice(0, baseDrawCount);
  updatedHand = [...updatedHand, ...baseDrawnCards];
  updatedDeck = updatedDeck.slice(baseDrawCount);

  const bonusDrawCount = Math.min(player.pendingDraw, updatedDeck.length);

  const bonusDrawnCards = updatedDeck.slice(0, bonusDrawCount);
  updatedHand = [...updatedHand, ...bonusDrawnCards];
  updatedDeck = updatedDeck.slice(bonusDrawCount);

  return {
    hand: updatedHand,
    deck: updatedDeck,
    pendingDraw: 0,
  };
}
