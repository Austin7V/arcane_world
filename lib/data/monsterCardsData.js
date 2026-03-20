import MonsterCard from "../game/MonsterCard";

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
  }),
];

export default monsterCardsData;
