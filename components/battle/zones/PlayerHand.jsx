import { useState } from "react";
import styled from "styled-components";
import PlayerHandCard from "./PlayerHandCard";
import HoveredCardPreview from "./HoveredCardPreview";

export default function PlayerHand({ cards, onSelectCard, selectedCard }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <HandArea>
      <HoveredCardPreview card={hoveredCard} />

      <HandCards>
        {cards.map((card, index) => (
          <CardSlot key={card.id} $index={index} $total={cards.length}>
            <PlayerHandCard
              card={card}
              onSelectCard={onSelectCard}
              isSelected={selectedCard?.id === card.id}
              onHoverCard={setHoveredCard}
              onLeaveCard={() => setHoveredCard(null)}
            />
          </CardSlot>
        ))}
      </HandCards>
    </HandArea>
  );
}

const HandArea = styled.div`
  position: relative;
  width: 100%;
  min-height: 420px;
  overflow: visible;
`;

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

  &:hover {
    z-index: 100;
  }
`;
