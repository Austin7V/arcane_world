import styled from "styled-components";
import PlayerHandCard from "./PlayerHandCard";

export default function PlayerHand({ cards, onSelectCard, selectedCard }) {
  return (
    <HandCards>
      {cards.map((card, index) => (
        <CardSlot key={card.id} $index={index} $total={cards.length}>
          <PlayerHandCard
            card={card}
            onSelectCard={onSelectCard}
            isSelected={selectedCard?.id === card.id}
          />
        </CardSlot>
      ))}
    </HandCards>
  );
}

const HandCards = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: nowrap;
  width: 100%;
  min-height: 380px;
  padding: 40px 100px 24px;
  overflow: visible;
`;

const CardSlot = styled.div`
  position: relative;
  margin-left: ${({ $index }) => ($index === 0 ? "0" : "-72px")};
  z-index: ${({ $index }) => $index + 1};
  transform: ${({ $index, $total }) => {
    const middle = ($total - 1) / 2;
    const offset = $index - middle;
    const rotate = offset * 4;
    const translateY = Math.abs(offset) * 10;
    return `translateY(${translateY}px) rotate(${rotate}deg)`;
  }};
  transform-origin: bottom center;
  transition:
    transform 0.2s ease,
    z-index 0.2s ease;

  &:hover {
    z-index: 100;
  }
`;
