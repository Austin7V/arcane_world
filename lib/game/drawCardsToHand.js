export default function drawCardsToHand(player, drawPenalty = 0) {
  let updatedHand = [...player.hand];
  let updatedDeck = [...player.deck];

  const cardsNeededToReachThree = Math.max(0, 3 - updatedHand.length);
  const totalRequestedDraw = cardsNeededToReachThree + player.pendingDraw;
  const finalDrawCount = Math.max(
    0,
    Math.min(totalRequestedDraw - drawPenalty, updatedDeck.length)
  );

  const drawnCards = updatedDeck.slice(0, finalDrawCount);
  updatedHand = [...updatedHand, ...drawnCards];
  updatedDeck = updatedDeck.slice(finalDrawCount);

  return {
    armor: player.armor,
    hand: updatedHand,
    deck: updatedDeck,
    pendingDraw: 0,
  };
}
