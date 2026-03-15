import styled from "styled-components";

export default function BattleResultOverlay({ battleResult }) {
  if (!battleResult) {
    return null;
  }

  const resultText = battleResult === "victory" ? "Victory" : "Defeat";

  return (
    <Overlay>
      <ResultCard>
        <ResultTitle>{resultText}</ResultTitle>
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
`;

const ResultTitle = styled.h1`
  margin: 0;
  font-size: 56px;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
