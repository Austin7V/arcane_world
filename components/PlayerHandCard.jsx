import styled from "styled-components";

export default function PlayerHandCard({ card }) {
  return (
    <CardWrapper>
      <CardTitle>{card.name}</CardTitle>
      <CardStat>Damage: {card.damage}</CardStat>
      <CardStat>Armor: {card.armor}</CardStat>
      <CardStat>Draw: {card.draw}</CardStat>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
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
