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

const Wrapper = styled.section``;

const Title = styled.h1``;

const Description = styled.p``;

const StartButton = styled.button``;
