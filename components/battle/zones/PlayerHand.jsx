import { useRef, useState } from "react";
import styled from "styled-components";
import PlayerHandCard from "./PlayerHandCard";
import HoveredCardPreview from "./HoveredCardPreview";

export default function PlayerHand({ cards, onSelectCard, selectedCard }) {
  const handAreaRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [previewX, setPreviewX] = useState(0);

  function handleHoverCard(card, event) {
    if (!handAreaRef.current) return;

    const handRect = handAreaRef.current.getBoundingClientRect();
    const cardRect = event.currentTarget.getBoundingClientRect();

    const cardCenterX = cardRect.left - handRect.left + cardRect.width / 2;

    setHoveredCard(card);
    setPreviewX(cardCenterX);
  }

  function handleLeaveCard() {
    setHoveredCard(null);
  }

  return (
    <HandArea ref={handAreaRef}>
      <HoveredCardPreview card={hoveredCard} previewX={previewX} />

      <HandCards>
        {cards.map((card, index) => (
          <CardSlot key={card.id} $index={index} $total={cards.length}>
            <PlayerHandCard
              card={card}
              onSelectCard={onSelectCard}
              isSelected={selectedCard?.id === card.id}
              onHoverCard={handleHoverCard}
              onLeaveCard={handleLeaveCard}
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
