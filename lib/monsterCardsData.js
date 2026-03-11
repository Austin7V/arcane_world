const monsterCardsData = [
  {
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
  },
  {
    id: "monster-card-2",
    name: "Wild Attack",
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
  },
];

export default monsterCardsData;
