import styled, { keyframes } from "styled-components";
import AuthBlock from "./AuthBlock";

export default function StartScreen({
  onStartGame,
  onContinueGame,
  hasSavedGame,
}) {
  return (
    <Wrapper>
      <BackgroundGlow />
      <BackgroundImage />
      <Overlay />

      <MenuPanel>
        <AuthBlock />
        <Description>Start a new run.</Description>
        {hasSavedGame && (
          <StartButton onClick={onContinueGame}>Continue</StartButton>
        )}
        <StartButton onClick={onStartGame}>Start Game</StartButton>
      </MenuPanel>
    </Wrapper>
  );
}

const floatZoom = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) scale(1);
    opacity: 0.38;
  }

  to {
    transform: translate3d(-50%, -50%, 0) scale(1.1);
    opacity: 1;
  }
`;

const glowPulse = keyframes`
  from {
    transform: translate3d(-50%, -50%, 0) scale(0.96);
    opacity: 0.2;
  }

  to {
    transform: translate3d(-50%, -50%, 0) scale(1.08);
    opacity: 0.6;
  }
`;

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #05070d;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 43%;
  width: 52vw;
  height: 52vw;
  max-width: 760px;
  max-height: 760px;
  min-width: 320px;
  min-height: 320px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(90, 170, 255, 0.45) 0%,
    rgba(90, 170, 255, 0.18) 35%,
    rgba(90, 170, 255, 0.08) 55%,
    rgba(90, 170, 255, 0) 75%
  );
  animation: ${glowPulse} 16s ease-out infinite alternate;
  will-change: transform, opacity;
  pointer-events: none;
  z-index: 0;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 50%;
  left: 43%;
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
  animation: ${floatZoom} 16s ease-out infinite alternate;
  will-change: transform, opacity;
  pointer-events: none;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.01),
    rgba(0, 0, 0, 0.5)
  );
  z-index: 2;
`;

const MenuPanel = styled.div`
  position: absolute;
  top: 50%;
  right: 7%;
  transform: translateY(-50%);
  z-index: 3;
  width: 320px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: rgba(8, 12, 20, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
`;

const Description = styled.p`
  margin: 0;
  color: #f3f6fb;
  font-size: 20px;
  line-height: 1.4;
  text-align: left;
`;

const StartButton = styled.button`
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
