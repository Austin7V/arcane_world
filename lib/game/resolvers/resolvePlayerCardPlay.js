export default function resolvePlayerCardPlay(gameState, selectedCard) {
  if (!selectedCard) {
    return null;
  }

  const alreadyPlayedCardsCount = gameState.playedPlayerCardsOnTable.length;

  if (alreadyPlayedCardsCount >= 4) {
    return null;
  }

  const playedGameState = selectedCard.play(gameState);

  const nextPlayedPlayerCards = [
    ...playedGameState.playedPlayerCardsOnTable,
    selectedCard,
  ];

  let logType = "damage";

  if (selectedCard.armor) {
    logType = "armor";
  }

  if (selectedCard.draw) {
    logType = "draw";
  }

  if (selectedCard.damage) {
    logType = "damage";
  }

  const nextGameState = {
    ...playedGameState,
    playedPlayerCardsOnTable: nextPlayedPlayerCards,
    playedMonsterCardOnTable: null,
    playedMonsterActionType: null,
  };

  return {
    nextGameState,
    logMessage: {
      type: logType,
    },
  };
}
