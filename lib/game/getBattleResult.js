export default function getBattleResult(gameState) {
  const playerHasNoCards =
    gameState.player.deck.length === 0 && gameState.player.hand.length === 0;

  const monsterHasNoCards = gameState.currentMonster.deck.length === 0;

  if (monsterHasNoCards) {
    return "victory";
  }

  if (playerHasNoCards) {
    return "defeat";
  }

  return null;
}
