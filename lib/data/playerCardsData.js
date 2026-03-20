import Card from "../game/Card";

const playerCardsData = [
  new Card({
    id: "player-card-1",
    name: "Quick Strike",
    type: "player",
    damage: 1,
    play(gameState) {
      let effectiveDamage = this.damage;
      let nextPendingMonsterEffect = gameState.pendingMonsterEffect;

      if (
        gameState.pendingMonsterEffect?.effect === "playerMaxDamageNextTurn"
      ) {
        effectiveDamage = Math.min(
          this.damage,
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
    },
  }),

  new Card({
    id: "player-card-2",
    name: "Shield Up",
    type: "player",
    armor: 1,
    play(gameState) {
      let effectiveArmorGain = this.armor;
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
    },
  }),

  new Card({
    id: "player-card-3",
    name: "Battle Focus",
    type: "player",
    draw: 2,
    play(gameState) {
      const updatedHand = gameState.player.hand.filter(
        (card) => card.id !== this.id
      );

      const updatedPendingDraw = gameState.player.pendingDraw + this.draw;

      return {
        ...gameState,
        player: {
          ...gameState.player,
          hand: updatedHand,
          pendingDraw: updatedPendingDraw,
        },
      };
    },
  }),

  new Card({
    id: "player-card-4",
    name: "Light Focus",
    type: "player",
    draw: 1,
    play(gameState) {
      const updatedHand = gameState.player.hand.filter(
        (card) => card.id !== this.id
      );

      const updatedPendingDraw = gameState.player.pendingDraw + this.draw;

      return {
        ...gameState,
        player: {
          ...gameState.player,
          hand: updatedHand,
          pendingDraw: updatedPendingDraw,
        },
      };
    },
  }),

  new Card({
    id: "player-card-5",
    name: "Deep Focus",
    type: "player",
    draw: 2,
    play(gameState) {
      const updatedHand = gameState.player.hand.filter(
        (card) => card.id !== this.id
      );

      const updatedPendingDraw = gameState.player.pendingDraw + this.draw;

      return {
        ...gameState,
        player: {
          ...gameState.player,
          hand: updatedHand,
          pendingDraw: updatedPendingDraw,
        },
      };
    },
  }),

  new Card({
    id: "player-card-6",
    name: "Sword Slash",
    type: "player",
    damage: 1,
    play(gameState) {
      let effectiveDamage = this.damage;
      let nextPendingMonsterEffect = gameState.pendingMonsterEffect;

      if (
        gameState.pendingMonsterEffect?.effect === "playerMaxDamageNextTurn"
      ) {
        effectiveDamage = Math.min(
          this.damage,
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
    },
  }),

  new Card({
    id: "player-card-7",
    name: "Strong Attack",
    type: "player",
    damage: 2,
    play(gameState) {
      let effectiveDamage = this.damage;
      let nextPendingMonsterEffect = gameState.pendingMonsterEffect;

      if (
        gameState.pendingMonsterEffect?.effect === "playerMaxDamageNextTurn"
      ) {
        effectiveDamage = Math.min(
          this.damage,
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
    },
  }),

  new Card({
    id: "player-card-8",
    name: "Guard Stance",
    type: "player",
    armor: 1,
    play(gameState) {
      let effectiveArmorGain = this.armor;
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
    },
  }),

  new Card({
    id: "player-card-9",
    name: "Tactical Move",
    type: "player",
    draw: 1,
    play(gameState) {
      const updatedHand = gameState.player.hand.filter(
        (card) => card.id !== this.id
      );

      const updatedPendingDraw = gameState.player.pendingDraw + this.draw;

      return {
        ...gameState,
        player: {
          ...gameState.player,
          hand: updatedHand,
          pendingDraw: updatedPendingDraw,
        },
      };
    },
  }),

  new Card({
    id: "player-card-10",
    name: "Battle Insight",
    type: "player",
    draw: 2,
    play(gameState) {
      const updatedHand = gameState.player.hand.filter(
        (card) => card.id !== this.id
      );

      const updatedPendingDraw = gameState.player.pendingDraw + this.draw;

      return {
        ...gameState,
        player: {
          ...gameState.player,
          hand: updatedHand,
          pendingDraw: updatedPendingDraw,
        },
      };
    },
  }),
];

export default playerCardsData;
