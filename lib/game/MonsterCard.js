import Card from "./Card";

export default class MonsterCard extends Card {
  constructor({ actions, ...cardData }) {
    super(cardData);
    this.actions = actions;
  }
}
