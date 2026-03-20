import styled from "styled-components";
import PlayerHand from "./zones/PlayerHand";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import MonsterDeck from "./zones/MonsterDeck";
import PlayerDeck from "./zones/PlayerDeck";
import BattleLog from "./panels/BattleLog";
import BattleInfoPanel from "./panels/BattleInfoPanel";
import resolvePlayerCardPlay from "@/lib/game/resolvers/resolvePlayerCardPlay";
import resolveMonsterTurn from "@/lib/game/resolvers/resolveMonsterTurn";
import getBattleResult from "@/lib/game/rules/getBattleResult";
import BattleResultOverlay from "./panels/BattleResultOverlay";
import createNextBattleState from "@/lib/game/state/createNextBattleState";
import createUserSyncPayload from "@/lib/users/createUserSyncPayload";
import syncUserToDatabase from "@/lib/users/syncUserToDatabase";

const BOARD_WIDTH = 1920;
const BOARD_HEIGHT = 1080;

export default function BattleScreen({ gameState, setGameState }) {
  const { data: session } = useSession();
  const [selectedCard, setSelectedCard] = useState(null);
  const [battleLogMessages, setBattleLogMessages] = useState([]);
  const [boardScale, setBoardScale] = useState(1);
  const previousBattleResultRef = useRef(null);

  useEffect(() => {
    function updateBoardScale() {
      const widthScale = window.innerWidth / BOARD_WIDTH;
      const heightScale = window.innerHeight / BOARD_HEIGHT;
      const nextScale = Math.min(widthScale, heightScale);

      setBoardScale(nextScale);
    }

    updateBoardScale();
    window.addEventListener("resize", updateBoardScale);

    return () => {
      window.removeEventListener("resize", updateBoardScale);
    };
  }, []);

  function handleNextBattle() {
    const nextBattleState = createNextBattleState(gameState);
    setGameState(nextBattleState);
  }

  async function handleResetGame() {
    try {
      const requestBody = createUserSyncPayload(session?.user, {
        activeGameState: null,
      });

      if (!requestBody) {
        setGameState(null);
        return;
      }

      if (battleResult === "defeat") {
        requestBody.incrementLosses = true;
        requestBody.currentStage = 1;
      }

      await syncUserToDatabase(requestBody);
    } catch (error) {
      console.error("Failed to reset saved game progress:", error);
    }

    setGameState(null);
  }

  function addBattleLogMessage(message) {
    setBattleLogMessages((previousMessages) => [message, ...previousMessages]);
  }

  async function saveVictoryProgress() {
    try {
      const requestBody = createUserSyncPayload(session?.user, {
        incrementWins: true,
        currentStage: gameState.victories + 2,
      });

      if (!requestBody) {
        return;
      }

      await syncUserToDatabase(requestBody);
    } catch (error) {
      console.error("Failed to save victory progress:", error);
    }
  }

  const playerHP = gameState.player.deck.length + gameState.player.hand.length;
  const monsterHP = gameState.currentMonster.deck.length;
  const battleResult = getBattleResult(gameState);
  const isBasicGameGoalReached = gameState.victories >= 3;

  useEffect(() => {
    if (
      battleResult === "victory" &&
      previousBattleResultRef.current !== "victory"
    ) {
      setGameState((previousGameState) => ({
        ...previousGameState,
        victories: previousGameState.victories + 1,
      }));

      saveVictoryProgress();
    }

    previousBattleResultRef.current = battleResult;
  }, [battleResult, setGameState]);

  function handleSelectCard(card) {
    setSelectedCard(card);
  }

  function handlePlayerCard() {
    if (battleResult) {
      return;
    }

    const result = resolvePlayerCardPlay(gameState, selectedCard);

    if (!result) {
      return;
    }

    setGameState(result.nextGameState);
    addBattleLogMessage(result.logMessage);
    setSelectedCard(null);
  }

  function handleEndTurn() {
    if (battleResult) {
      return;
    }

    const result = resolveMonsterTurn(gameState);

    if (!result) {
      return;
    }

    setGameState(result.nextGameState);
    addBattleLogMessage(result.logMessage);
    setSelectedCard(null);
  }

  return (
    <Wrapper>
      <Scene scale={boardScale}>
        <Board>
          <MonsterPortraitArea>
            <FrameTitle>Monster</FrameTitle>
            <InfoText>{gameState.currentMonster.name}</InfoText>
          </MonsterPortraitArea>

          <MonsterStatusArea>
            <FrameTitle>Monster Status</FrameTitle>
            <InfoText>HP: {monsterHP}</InfoText>
          </MonsterStatusArea>

          <MonsterDeckArea>
            <MonsterDeck cards={gameState.currentMonster.deck} />
          </MonsterDeckArea>

          <BattleLogArea>
            <BattleLog messages={battleLogMessages} />
          </BattleLogArea>

          <BattleInfoArea>
            <BattleInfoPanel
              selectedCard={selectedCard}
              currentTurn={gameState.currentTurn}
              pendingMonsterEffect={gameState.pendingMonsterEffect}
              battleResult={battleResult}
              victories={gameState.victories}
              isBasicGameGoalReached={isBasicGameGoalReached}
              onPlayCard={handlePlayerCard}
              onEndTurn={handleEndTurn}
              isPlayCardDisabled={
                !selectedCard ||
                gameState.currentTurn !== "player" ||
                battleResult !== null
              }
              isEndTurnDisabled={
                gameState.currentTurn !== "player" || battleResult !== null
              }
            />
          </BattleInfoArea>

          <PlayerDeckArea>
            <PlayerDeck cards={gameState.player.deck} />
          </PlayerDeckArea>

          <PlayerCardsArea>
            <PlayerHand
              cards={gameState.player.hand}
              onSelectCard={handleSelectCard}
              selectedCard={selectedCard}
            />
          </PlayerCardsArea>

          <PlayerStatusArea>
            <FrameTitle>Player Status</FrameTitle>
            <InfoText>{gameState.player.name}</InfoText>
            <InfoText>HP: {playerHP}</InfoText>
            <InfoText>Armor: {gameState.player.armor}</InfoText>
            <InfoText>Victories: {gameState.victories}</InfoText>
          </PlayerStatusArea>

          <PlayerPortraitArea>
            <FrameTitle>Player</FrameTitle>
            <InfoText>{gameState.player.name}</InfoText>
          </PlayerPortraitArea>
        </Board>
      </Scene>

      <BattleResultOverlay
        battleResult={battleResult}
        isBasicGameGoalReached={isBasicGameGoalReached}
        onNextBattle={handleNextBattle}
        onReset={handleResetGame}
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #05070d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Scene = styled.div`
  width: 1920px;
  height: 1080px;
  transform: scale(${({ scale }) => scale});
  transform-origin: center center;
`;

const Board = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;
  background-image: url("/images/battle-board.jpg");
  background-size: 1920px 1080px;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
`;

const BaseArea = styled.div`
  position: absolute;
  color: #f3f6fb;
`;

const PanelArea = styled(BaseArea)`
  padding: 10px 12px;
  background: rgba(10, 14, 22, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const MonsterPortraitArea = styled(PanelArea)`
  left: 900px;
  top: 125px;
  width: 128px;
  height: 96px;
  text-align: center;
`;

const MonsterStatusArea = styled(PanelArea)`
  left: 1130px;
  top: 200px;
  width: 250px;
  min-height: 76px;
`;

const MonsterDeckArea = styled(BaseArea)`
  left: 1450px;
  top: 150px;
  width: 132px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BattleLogArea = styled(PanelArea)`
  left: 200px;
  top: 260px;
  width: 170px;
  height: 450px;
`;

const BattleInfoArea = styled(PanelArea)`
  left: 620px;
  top: 350px;
  width: 690px;
  height: 330px;
`;

const PlayerDeckArea = styled(BaseArea)`
  left: 350px;
  top: 710px;
  width: 132px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayerCardsArea = styled(PanelArea)`
  left: 1100px;
  top: 750px;
  width: 485px;
  height: 300px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const PlayerStatusArea = styled(PanelArea)`
  left: 570px;
  top: 750px;
  width: 200px;
  min-height: 130px;
`;

const PlayerPortraitArea = styled(PanelArea)`
  left: 900px;
  top: 850px;
  width: 128px;
  height: 104px;
  text-align: center;
`;

const FrameTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.3;
`;
