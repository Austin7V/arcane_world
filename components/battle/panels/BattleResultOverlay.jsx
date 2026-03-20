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

  let status = "defeat";

  if (battleResult === "victory" && !isBasicGameGoalReached) {
    status = "partial-victory";
  }

  if (battleResult === "victory" && isBasicGameGoalReached) {
    status = "game-goal-achieved";
  }

  return (
    <Overlay>
      <ResultCard>
        <ResultTitle>{resultText}</ResultTitle>

        {status === "partial-victory" && (
          <>
            <ActionButton onClick={onNextBattle}>Next Battle</ActionButton>
            <ActionButton onClick={() => router.push("/")}>
              Back to Main Menu
            </ActionButton>
          </>
        )}

        {status === "game-goal-achieved" && (
          <ActionButton
            onClick={() => {
              onReset();
              router.push("/");
            }}
          >
            Finish Run
          </ActionButton>
        )}

        {status === "defeat" && (
          <ActionButton
            onClick={() => {
              onReset();
              router.push("/");
            }}
          >
            Back to Start
          </ActionButton>
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
