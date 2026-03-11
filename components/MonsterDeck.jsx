import styled from "styled-components";

export default function MonsterDeck({ cards }) {
  return (
    <DeckWrapper>
      {cards.map((card, index) => (
        <MonsterCardBack key={`${card.id}-${index}`}>
          Monster Card
        </MonsterCardBack>
      ))}
    </DeckWrapper>
  );
}

const DeckWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
`;

const MonsterCardBack = styled.div`
  min-width: 120px;
  padding: 16px;
  border: 1px solid white;
  border-radius: 12px;
  text-align: center;
`;
