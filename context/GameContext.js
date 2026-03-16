import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext(null);

const GAME_STATE_STORAGE_KEY = "arcane-world-game-state";

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(null);
  const [isGameStateHydrated, setIsGameStateHydrated] = useState(false);

  useEffect(() => {
    const savedGameState = localStorage.getItem(GAME_STATE_STORAGE_KEY);

    if (savedGameState) {
      setGameState(JSON.parse(savedGameState));
    }

    setIsGameStateHydrated(true);
  }, []);

  useEffect(() => {
    if (!isGameStateHydrated) {
      return;
    }

    if (!gameState) {
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
      return;
    }

    localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState, isGameStateHydrated]);

  return (
    <GameContext.Provider
      value={{ gameState, setGameState, isGameStateHydrated }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
