const monsterPortraitImages = {
  Fiend: "/monsters/fiend.png",
  Ghoul: "/monsters/ghoul.png",
  Wolf: "/monsters/wolf.png",
};

export default function getMonsterPortraitImage(monsterName) {
  return monsterPortraitImages[monsterName] ?? null;
}
