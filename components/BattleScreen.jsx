import styled from "styled-components";

export default function BattleScreen({ gameState }) {
  return (
    <Wrapper>
      <MonsterArea>
        <SectionTitle>Monster</SectionTitle>
        <InfoText>Name: {gameState.currentMonster.name}</InfoText>
        <InfoText>HP: {gameState.currentMonster.hp}</InfoText>
        <InfoText>Cards: {gameState.currentMonster.deck.length}</InfoText>
      </MonsterArea>

      <BattleInfoArea>
        <SectionTitle>Battle Info</SectionTitle>
        <InfoText>The battle has started.</InfoText>
      </BattleInfoArea>

      <PlayerArea>
        <SectionTitle>Player</SectionTitle>
        <InfoText>Name: {gameState.player.name}</InfoText>
        <InfoText>HP: {gameState.player.hp}</InfoText>
        <InfoText>Hand: {gameState.player.hand.length}</InfoText>
        <InfoText>Deck: {gameState.player.deck.length}</InfoText>
      </PlayerArea>
      <HandCards>
        {gameState.player.hand.map((card) => (
          <PlayerCard key={card.id}>
            <CardTitle>{card.name}</CardTitle>
            <CardStat>Damage: {card.damage}</CardStat>
            <CardStat>Armor: {card.armor}</CardStat>
            <CardStat>Draw: {card.draw}</CardStat>
          </PlayerCard>
        ))}
      </HandCards>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  gap: 16px;
  padding: 24px;
`;

const MonsterArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const BattleInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const PlayerArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: 1px solid white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
`;

const InfoText = styled.p`
  margin: 0;
`;

const HandCards = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PlayerCard = styled.div`
  min-width: 140px;
  padding: 16px;
  border: 1px solid white;
  border-radius: 12px;
  text-align: center;
`;

const CardTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
`;

const CardStat = styled.p`
  margin: 0 0 6px;
`;
