import styled from "styled-components";

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
  color: #f3f6fb;
`;

const PanelSection = styled(BaseSection)`
  padding: 10px 12px;
  background: rgba(10, 14, 22, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const MonsterPortraitSection = styled(PanelSection)`
  left: 900px;
  top: 125px;
  width: 128px;
  height: 96px;
  text-align: center;
`;

export const MonsterStatusSection = styled(PanelSection)`
  left: 1130px;
  top: 200px;
  width: 250px;
  min-height: 76px;
`;

export const MonsterDeckSection = styled(BaseSection)`
  left: 1450px;
  top: 150px;
  width: 132px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BattleLogSection = styled(PanelSection)`
  left: 200px;
  top: 260px;
  width: 170px;
  height: 450px;
`;

export const BattleInfoSection = styled(PanelSection)`
  left: 620px;
  top: 350px;
  width: 690px;
  height: 330px;
`;

export const PlayerDeckSection = styled(BaseSection)`
  left: 350px;
  top: 710px;
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
