import { createContext, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

const GameContext = createContext(null);

const GAME_STATE_STORAGE_KEY = "arcane-world-game-state";

export function GameProvider({ children }) {
  const [gameState, setGameState] = useLocalStorageState(
    GAME_STATE_STORAGE_KEY,
    {
      defaultValue: null,
    }
  );

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
