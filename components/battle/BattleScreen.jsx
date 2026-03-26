import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import PlayerHand from "./zones/PlayerHand";
import MonsterDeck from "./zones/MonsterDeck";
import PlayerDeck from "./zones/PlayerDeck";
import BattleLog from "./panels/BattleLog";
import BattleResultOverlay from "./panels/BattleResultOverlay";
import useBoardScale from "@/hooks/useBoardScale";
import useBattleScreenLogic from "@/hooks/useBattleScreenLogic";
import {
  Wrapper,
  SceneWrapper,
  BoardScene,
  MonsterPortraitSection,
  MonsterStatusSection,
  MonsterDeckSection,
  BattleLogSection,
  BattleInfoSection,
  PlayerDeckSection,
  PlayerCardsSection,
  PlayerStatusSection,
  PlayerPortraitSection,
  FrameTitle,
  InfoText,
  EndTurnSection,
  EndTurnButton,
} from "./BattleScreen.styled";

const BOARD_WIDTH = 1920;
const BOARD_HEIGHT = 1080;

export default function BattleScreen({ gameState, setGameState }) {
  const { data: session } = useSession();
  const boardScale = useBoardScale(BOARD_WIDTH, BOARD_HEIGHT);
  const battleInfoRef = useRef(null);

  const [battleInfoRect, setBattleInfoRect] = useState(null);
  const [isBattleDropActive, setIsBattleDropActive] = useState(false);

  const {
    selectedCard,
    battleLogMessages,
    playerHP,
    monsterHP,
    battleResult,
    isBasicGameGoalReached,
    handleSelectCard,
    handlePlayerCard,
    handleEndTurn,
    handleNextBattle,
    handleResetGame,
  } = useBattleScreenLogic({ gameState, setGameState, session });

  useEffect(() => {
    function updateBattleInfoRect() {
      if (!battleInfoRef.current) return;
      setBattleInfoRect(battleInfoRef.current.getBoundingClientRect());
    }

    updateBattleInfoRect();
    window.addEventListener("resize", updateBattleInfoRect);

    return () => {
      window.removeEventListener("resize", updateBattleInfoRect);
    };
  }, [boardScale]);

  function handleCardDrop(card) {
    handlePlayerCard();
  }

  return (
    <Wrapper>
      <SceneWrapper style={{ transform: `scale(${boardScale})` }}>
        <BoardScene>
          <MonsterPortraitSection>
            <FrameTitle>Monster</FrameTitle>
            <InfoText>{gameState.currentMonster.name}</InfoText>
          </MonsterPortraitSection>

          <MonsterStatusSection>
            <FrameTitle>Monster Status</FrameTitle>
            <InfoText>HP: {monsterHP}</InfoText>
          </MonsterStatusSection>

          <MonsterDeckSection>
            <MonsterDeck cards={gameState.currentMonster.deck} />
          </MonsterDeckSection>

          <BattleLogSection>
            <BattleLog messages={battleLogMessages} />
          </BattleLogSection>

          <BattleInfoSection
            ref={battleInfoRef}
            $isDropActive={isBattleDropActive}
          />
          <EndTurnSection>
            <EndTurnButton
              onClick={handleEndTurn}
              disabled={
                gameState.currentTurn !== "player" || battleResult !== null
              }
            >
              End Turn
            </EndTurnButton>
          </EndTurnSection>

          <PlayerDeckSection>
            <PlayerDeck cards={gameState.player.deck} />
          </PlayerDeckSection>

          <PlayerCardsSection>
            <PlayerHand
              cards={gameState.player.hand}
              onSelectCard={handleSelectCard}
              selectedCard={selectedCard}
              battleInfoRect={battleInfoRect}
              onDropCard={handleCardDrop}
              onDragOverBattleZone={setIsBattleDropActive}
              canDrag={
                gameState.currentTurn === "player" && battleResult === null
              }
            />
          </PlayerCardsSection>

          <PlayerStatusSection>
            <FrameTitle>Player Status</FrameTitle>
            <InfoText>{gameState.player.name}</InfoText>
            <InfoText>HP: {playerHP}</InfoText>
            <InfoText>Armor: {gameState.player.armor}</InfoText>
            <InfoText>Victories: {gameState.victories}</InfoText>
          </PlayerStatusSection>

          <PlayerPortraitSection>
            <FrameTitle>Player</FrameTitle>
            <InfoText>{gameState.player.name}</InfoText>
          </PlayerPortraitSection>
        </BoardScene>
      </SceneWrapper>

      <BattleResultOverlay
        battleResult={battleResult}
        isBasicGameGoalReached={isBasicGameGoalReached}
        onNextBattle={handleNextBattle}
        onReset={handleResetGame}
      />
    </Wrapper>
  );
}
