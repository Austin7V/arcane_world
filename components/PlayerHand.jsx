import styled from "styled-components";
import PlayerHandCard from "./PlayerHandCard";

export default function PlayerHand({ cards, onSelectCard }) {
  return (
    <HandCards>
      {cards.map((card) => (
        <PlayerHandCard key={card.id} card={card} onSelectCard={onSelectCard} />
      ))}
    </HandCards>
  );
}

const HandCards = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;
