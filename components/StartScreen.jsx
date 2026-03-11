import styled, { keyframes } from "styled-components";

export default function StartScreen({ onStartGame }) {
  return (
    <Wrapper>
      <BackgroundImage />
      <Overlay />
      <Content>
        <Title>Arcane World</Title>
        <Description>Start a new run and enter the battle.</Description>
        <StartButton onClick={onStartGame}>Start Game</StartButton>
      </Content>
    </Wrapper>
  );
}

const floatZoom = keyframes`
  from {
    transform: translate(-50%, -50%) scale(1);
  }

  to {
    transform: translate(-50%, -50%) scale(1.08);
  }
`;

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 50vw;
  max-width: 700px;
  max-height: 700px;
  min-width: 280px;
  min-height: 280px;
  background-image: url("/images/arcane-world-bg.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  animation: ${floatZoom} 12s ease-in-out infinite alternate;
  opacity: 0.35;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
  cursor: pointer;
`;
