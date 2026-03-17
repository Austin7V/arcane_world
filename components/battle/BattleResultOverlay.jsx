import { useRouter } from "next/router";
import styled from "styled-components";

export default function BattleResultOverlay({
  battleResult,
  isBasicGameGoalReached,
  onNextBattle,
  onReset,
}) {
  const router = useRouter();

  if (!battleResult) {
    return null;
  }

  const resultText = battleResult === "victory" ? "Victory" : "Defeat";

  function handleBackToStart() {
    onReset();
    router.push("/");
  }

  function handleFinishRun() {
    onReset();
    router.push("/");
  }

  function handleBackToMainMenu() {
    router.push("/");
  }

  return (
    <Overlay>
      <ResultCard>
        <ResultTitle>{resultText}</ResultTitle>

        {battleResult === "victory" && !isBasicGameGoalReached && (
          <>
            <ActionButton onClick={onNextBattle}>Next Battle</ActionButton>
            <ActionButton onClick={handleBackToMainMenu}>
              Back to Main Menu
            </ActionButton>
          </>
        )}

        {battleResult === "victory" && isBasicGameGoalReached && (
          <ActionButton onClick={handleFinishRun}>Finish Run</ActionButton>
        )}

        {battleResult === "defeat" && (
          <ActionButton onClick={handleBackToStart}>Back to Start</ActionButton>
        )}
      </ResultCard>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ResultCard = styled.div`
  padding: 40px 56px;
  border: 1px solid white;
  border-radius: 16px;
  background: rgba(10, 10, 10, 0.78);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ResultTitle = styled.h1`
  margin: 0;
  font-size: 56px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
