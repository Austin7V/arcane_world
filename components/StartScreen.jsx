import styled from "styled-components";

export default function StartScreen({ onStartGame }) {
  return (
    <Wrapper>
      <Title>Arcane World</Title>
      <Description>Start a new run and enter the battle.</Description>
      <StartButton onClick={onStartGame}>Start Game</StartButton>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 48px;
`;

const Description = styled.p`
  margin: 0;
  font-size: 18px;
`;

const StartButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
`;
