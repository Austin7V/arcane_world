import Card from "./Card";

export default class MonsterCard extends Card {
  constructor({ actions, play, ...cardData }) {
    super({ ...cardData, play });
    this.actions = actions;
  }

  removeSelfFromMonsterDeck(gameState) {
    const updatedMonsterDeck = [...gameState.currentMonster.deck];
    const cardIndex = updatedMonsterDeck.findIndex(
      (card) => card.id === this.id
    );

    if (cardIndex !== -1) {
      updatedMonsterDeck.splice(cardIndex, 1);
    }

    return updatedMonsterDeck;
  }
}
