export default class Card {
  constructor({
    id,
    name,
    type,
    damage = 0,
    armor = 0,
    draw = 0,
    play = null,
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.damage = damage;
    this.armor = armor;
    this.draw = draw;
    this.customPlay = play ? play.bind(this) : null;
  }

  play(gameState) {
    if (this.customPlay) {
      return this.customPlay(gameState);
    }

    return gameState;
  }
}
