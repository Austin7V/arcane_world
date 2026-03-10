export default function createInitialGameState() {
  return {
    screen: "battle",
    runStarted: true,
    player: {
      name: "Austin",
      hp: 10,
    },
    deck: [],
    currentMonster: null,
    battleResult: null,
    victories: 0,
  };
}
