const playerCardImages = {
  "player-card-1": "/cards/01_card_quick_strike.png",
  "player-card-2": "/cards/02_card_shield_up.png",
  "player-card-3": "/cards/03_card_battle_focus.png",
  "player-card-4": "/cards/04_card_light_focus.png",
  "player-card-5": "/cards/05_card_deep_focus.png",
  "player-card-6": "/cards/06_card_sword_slash.png",
  "player-card-7": "/cards/07_card_strong_attack.png",
  "player-card-8": "/cards/08_card_guard_stance.png",
  "player-card-9": "/cards/09_card_tactical_move.png",
  "player-card-10": "/cards/10_card_battle_insight.png",
};

export default function getPlayerCardImage(cardId) {
  return playerCardImages[cardId] ?? "/cards/01_card_quick_strike.png";
}
