import styled from "styled-components";
import Image from "next/image";

export const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #05070d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SceneWrapper = styled.div`
  width: 1920px;
  height: 1080px;
  transform-origin: center center;
`;

export const BoardScene = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;
  background-image: url("/images/battle-board.jpg");
  background-size: 1920px 1080px;
  background-repeat: no-repeat;
  background-position: center;
  overflow: visible;
`;

const BaseSection = styled.section`
  position: absolute;
  color: #fdfdfd;
`;

const PanelSection = styled(BaseSection)`
  padding: 10px 12px;
  background: rgba(10, 14, 22, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MonsterPortraitSection = styled(PanelSection)`
  left: 703px;
  top: 5px;
  width: 455px;
  height: 355px;
  text-align: center;
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;
`;

export const MonsterStatusSection = styled(PanelSection)`
  left: 1130px;
  top: 200px;
  width: 250px;
  min-height: 76px;
`;

export const MonsterDeckSection = styled(BaseSection)`
  left: 1440px;
  top: 115px;
  width: 132px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BattleLogSection = styled(PanelSection)`
  left: 250px;
  top: 260px;
  width: 80px;
  height: 450px;
  perspective: 1000px;
  background: transparent;
  transform: rotateY(18deg) rotateX(-26deg) skewY(0deg);
  transform-origin: center center;
`;

export const BattleInfoSection = styled(BaseSection)`
  left: 620px;
  top: 350px;
  width: 690px;
  height: 330px;
  border-radius: 18px;
  background: transparent;
  border: none;
  transition:
    box-shadow 0.2s ease,
    border 0.2s ease,
    background 0.2s ease;

  ${({ $isDropActive }) =>
    $isDropActive &&
    `
      border: 2px solid rgba(110, 200, 255, 0.9);
      background: rgba(30, 50, 90, 0.18);
      box-shadow: 0 0 28px rgba(110, 200, 255, 0.28);
    `}
`;

export const PlayerDeckSection = styled(BaseSection)`
  left: 360px;
  top: 740px;
  width: 132px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayerCardsSection = styled(PanelSection)`
  left: 1000px;
  top: 650px;
  width: 800px;
  height: 450px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
  background: transparent;
  border: none;
  padding: 0;
`;

export const PlayerStatusSection = styled(PanelSection)`
  left: 570px;
  top: 750px;
  width: 200px;
  min-height: 130px;
`;

export const PlayerPortraitSection = styled(PanelSection)`
  left: 900px;
  top: 850px;
  width: 128px;
  height: 104px;
  text-align: center;
`;

export const FrameTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
`;

export const InfoText = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.3;
`;

export const EndTurnSection = styled.section`
  position: absolute;
  right: 110px;
  top: 470px;
  z-index: 20;
`;

export const EndTurnButton = styled.button`
  padding: 16px 28px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  background: rgba(12, 18, 30, 0.78);
  color: #f3f6fb;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: rgba(22, 32, 52, 0.88);
    box-shadow: 0 0 18px rgba(110, 200, 255, 0.22);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const MonsterPortraitImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const MonsterPortraitImage = styled(Image)`
  object-fit: contain;
  user-select: none;
`;
