import applyMonsterStrike from "./applyMonsterStrike";
import drawCardsToHand from "./drawCardsToHand";

export default function resolveMonsterTurn(gameState) {
  if (gameState.currentTurn !== "player") {
    return null;
  }

  if (gameState.currentMonster.deck.length === 0) {
    return null;
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
      logMessage: `Monster used ${randomMonsterCard.name} with Strike for ${strikeDamage} damage`,
    };
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

    const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayer, drawPenalty);

    if (biteEffect.effect === "playerDrawReductionNextTurn") {
      nextPendingMonsterEffect = null;
    }

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
      logMessage: biteLogMessage,
    };
  }

  return null;
}
