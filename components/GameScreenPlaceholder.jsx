import styled from "styled-components";

export default function GameScreenPlaceholder({ gameState }) {
  return (
    <Wrapper>
      <Title>Game Started</Title>
      <Description>Current screen: {gameState.screen}</Description>
      <Description>
        Player cards loaded: {gameState.cardPools.playerCards.length}
      </Description>
      <Description>
        Monster cards loaded: {gameState.cardPools.monsterCards.length}
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
`;
