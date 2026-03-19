import Card from "../game/Card";

const playerCardsData = [
  new Card({
    id: "player-card-1",
    name: "Quick Strike",
    type: "player",
    damage: 1,
  }),
  new Card({
    id: "player-card-2",
    name: "Shield Up",
    type: "player",
    armor: 1,
  }),
  new Card({
    id: "player-card-3",
    name: "Battle Focus",
    type: "player",
    draw: 2,
  }),
  new Card({
    id: "player-card-4",
    name: "Light Focus",
    type: "player",
    draw: 1,
  }),
  new Card({
    id: "player-card-5",
    name: "Deep Focus",
    type: "player",
    draw: 2,
  }),
  new Card({
    id: "player-card-6",
    name: "Sword Slash",
    type: "player",
    damage: 1,
  }),
  new Card({
    id: "player-card-7",
    name: "Strong Attack",
    type: "player",
    damage: 2,
  }),
  new Card({
    id: "player-card-8",
    name: "Guard Stance",
    type: "player",
    armor: 1,
  }),
  new Card({
    id: "player-card-9",
    name: "Tactical Move",
    type: "player",
    draw: 1,
  }),
  new Card({
    id: "player-card-10",
    name: "Battle Insight",
    type: "player",
    draw: 2,
  }),
];

export default playerCardsData;
