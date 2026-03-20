import MonsterCard from "../game/MonsterCard";
import applyMonsterStrike from "../game/applyMonsterStrike";
import drawCardsToHand from "../game/drawCardsToHand";

const monsterCardsData = [
  new MonsterCard({
    id: "monster-card-1",
    name: "Savage Claws",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "playerMaxDamageNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;

        let updatedPlayer = {
          ...gameState.player,
        };

        let nextPendingMonsterEffect = biteEffect;
        let biteLogMessage = `Monster used ${this.name} with Bite (${biteEffect.effect})`;

        if (biteEffect.effect === "discardRandomCard") {
          if (updatedPlayer.hand.length > 0) {
            const discardIndex = Math.floor(
              Math.random() * updatedPlayer.hand.length
            );
            const discardedCard = updatedPlayer.hand[discardIndex];

            updatedPlayer.hand = updatedPlayer.hand.filter(
              (_, index) => index !== discardIndex
            );

            biteLogMessage = `Monster used ${this.name} with Bite and discarded ${discardedCard.name}`;
          }

          nextPendingMonsterEffect = null;
        }

        const drawPenalty =
          biteEffect.effect === "playerDrawReductionNextTurn"
            ? biteEffect.value
            : 0;

        const updatedPlayerAfterDraw = drawCardsToHand(
          updatedPlayer,
          drawPenalty
        );

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
    },
  }),

  new MonsterCard({
    id: "monster-card-2",
    name: "Beast Rush",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "ignoreArmorNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;

        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-3",
    name: "Rotten Fangs",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "discardRandomCard",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        let updatedPlayer = {
          ...gameState.player,
        };

        let biteLogMessage = `Monster used ${this.name} with Bite (${this.actions.bite.effect})`;

        if (updatedPlayer.hand.length > 0) {
          const discardIndex = Math.floor(
            Math.random() * updatedPlayer.hand.length
          );
          const discardedCard = updatedPlayer.hand[discardIndex];

          updatedPlayer.hand = updatedPlayer.hand.filter(
            (_, index) => index !== discardIndex
          );

          biteLogMessage = `Monster used ${this.name} with Bite and discarded ${discardedCard.name}`;
        }

        const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayer, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
    },
  }),

  new MonsterCard({
    id: "monster-card-4",
    name: "Night Hunt",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "playerDrawReductionNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(
          gameState.player,
          biteEffect.value
        );

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-5",
    name: "Bone Crusher",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "blockArmorGainNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-6",
    name: "Wild Howl",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "playerMaxDamageNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-7",
    name: "Venom Snap",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "discardRandomCard",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        let updatedPlayer = {
          ...gameState.player,
        };

        let biteLogMessage = `Monster used ${this.name} with Bite (${this.actions.bite.effect})`;

        if (updatedPlayer.hand.length > 0) {
          const discardIndex = Math.floor(
            Math.random() * updatedPlayer.hand.length
          );
          const discardedCard = updatedPlayer.hand[discardIndex];

          updatedPlayer.hand = updatedPlayer.hand.filter(
            (_, index) => index !== discardIndex
          );

          biteLogMessage = `Monster used ${this.name} with Bite and discarded ${discardedCard.name}`;
        }

        const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayer, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
    },
  }),

  new MonsterCard({
    id: "monster-card-8",
    name: "Predator Leap",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "ignoreArmorNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-9",
    name: "Shadow Maw",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "playerDrawReductionNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(
          gameState.player,
          biteEffect.value
        );

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-10",
    name: "Rage Strike",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "blockArmorGainNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-11",
    name: "Terror Bite",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "discardRandomCard",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        let updatedPlayer = {
          ...gameState.player,
        };

        let biteLogMessage = `Monster used ${this.name} with Bite (${this.actions.bite.effect})`;

        if (updatedPlayer.hand.length > 0) {
          const discardIndex = Math.floor(
            Math.random() * updatedPlayer.hand.length
          );
          const discardedCard = updatedPlayer.hand[discardIndex];

          updatedPlayer.hand = updatedPlayer.hand.filter(
            (_, index) => index !== discardIndex
          );

          biteLogMessage = `Monster used ${this.name} with Bite and discarded ${discardedCard.name}`;
        }

        const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayer, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
    },
  }),

  new MonsterCard({
    id: "monster-card-12",
    name: "Blood Claw",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "playerMaxDamageNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-13",
    name: "Crushing Jaw",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "ignoreArmorNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-14",
    name: "Feral Charge",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "playerDrawReductionNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(
          gameState.player,
          biteEffect.value
        );

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-15",
    name: "Carrion Teeth",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "blockArmorGainNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-16",
    name: "Dark Pounce",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "discardRandomCard",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        let updatedPlayer = {
          ...gameState.player,
        };

        let biteLogMessage = `Monster used ${this.name} with Bite (${this.actions.bite.effect})`;

        if (updatedPlayer.hand.length > 0) {
          const discardIndex = Math.floor(
            Math.random() * updatedPlayer.hand.length
          );
          const discardedCard = updatedPlayer.hand[discardIndex];

          updatedPlayer.hand = updatedPlayer.hand.filter(
            (_, index) => index !== discardIndex
          );

          biteLogMessage = `Monster used ${this.name} with Bite and discarded ${discardedCard.name}`;
        }

        const updatedPlayerAfterDraw = drawCardsToHand(updatedPlayer, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
    },
  }),

  new MonsterCard({
    id: "monster-card-17",
    name: "Hunter Instinct",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "playerMaxDamageNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-18",
    name: "Cursed Bite",
    type: "monster",
    actions: {
      strike: {
        damage: 1,
      },
      bite: {
        effect: "ignoreArmorNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-19",
    name: "Brutal Slam",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "playerDrawReductionNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(
          gameState.player,
          biteEffect.value
        );

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: null,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),

  new MonsterCard({
    id: "monster-card-20",
    name: "Abyss Fang",
    type: "monster",
    actions: {
      strike: {
        damage: 2,
      },
      bite: {
        effect: "blockArmorGainNextTurn",
        value: 1,
      },
    },
    play(gameState, actionType) {
      const updatedMonsterDeck = this.removeSelfFromMonsterDeck(gameState);

      if (actionType === "strike") {
        const strikeDamage = this.actions.strike.damage;

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
          logMessage: `Monster used ${this.name} with Strike for ${strikeDamage} damage`,
        };
      }

      if (actionType === "bite") {
        const biteEffect = this.actions.bite;
        const updatedPlayerAfterDraw = drawCardsToHand(gameState.player, 0);

        return {
          nextGameState: {
            ...gameState,
            currentTurn: "player",
            pendingMonsterEffect: biteEffect,
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
          logMessage: `Monster used ${this.name} with Bite (${biteEffect.effect})`,
        };
      }

      return null;
    },
  }),
];

export default monsterCardsData;
