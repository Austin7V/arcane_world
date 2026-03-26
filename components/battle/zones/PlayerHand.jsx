import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlayerHandCard from "./PlayerHandCard";
import HoveredCardPreview from "./HoveredCardPreview";
import DraggedCardPreview from "./DraggedCardPreview";

export default function PlayerHand({
  cards,
  onSelectCard,
  selectedCard,
  battleInfoRect,
  onDropCard,
  onDragOverBattleZone,
  canDrag,
}) {
  const handAreaRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [previewX, setPreviewX] = useState(0);

  const [draggedCard, setDraggedCard] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isOverBattleZone, setIsOverBattleZone] = useState(false);

  function handleHoverCard(card, event) {
    if (!handAreaRef.current || draggedCard) return;

    const handRect = handAreaRef.current.getBoundingClientRect();
    const cardRect = event.currentTarget.getBoundingClientRect();
    const cardCenterX = cardRect.left - handRect.left + cardRect.width / 2;

    setHoveredCard(card);
    setPreviewX(cardCenterX);
  }

  function handleLeaveCard() {
    if (draggedCard) return;
    setHoveredCard(null);
  }

  function handleStartDrag(card, event) {
    if (!canDrag) return;

    onSelectCard(card);
    setHoveredCard(null);
    setDraggedCard(card);
    setDragPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  useEffect(() => {
    if (!draggedCard) return;

    function handleMouseMove(event) {
      const nextPosition = {
        x: event.clientX,
        y: event.clientY,
      };

      setDragPosition(nextPosition);

      if (!battleInfoRect) return;

      const isInsideBattleZone =
        nextPosition.x >= battleInfoRect.left &&
        nextPosition.x <= battleInfoRect.right &&
        nextPosition.y >= battleInfoRect.top &&
        nextPosition.y <= battleInfoRect.bottom;

      setIsOverBattleZone(isInsideBattleZone);
      onDragOverBattleZone?.(isInsideBattleZone);
    }

    function handleMouseUp() {
      if (isOverBattleZone && draggedCard) {
        onDropCard?.(draggedCard);
      }

      setDraggedCard(null);
      setIsOverBattleZone(false);
      onDragOverBattleZone?.(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    draggedCard,
    battleInfoRect,
    isOverBattleZone,
    onDropCard,
    onDragOverBattleZone,
  ]);

  return (
    <HandArea ref={handAreaRef}>
      {!draggedCard ? (
        <HoveredCardPreview card={hoveredCard} previewX={previewX} />
      ) : null}

      <HandCards>
        {cards.map((card, index) => (
          <CardSlot key={card.id} $index={index} $total={cards.length}>
            <PlayerHandCard
              card={card}
              onSelectCard={onSelectCard}
              isSelected={selectedCard?.id === card.id}
              onHoverCard={handleHoverCard}
              onLeaveCard={handleLeaveCard}
              onStartDrag={handleStartDrag}
              isDragging={draggedCard?.id === card.id}
              canDrag={canDrag}
            />
          </CardSlot>
        ))}
      </HandCards>

      {draggedCard ? (
        <DraggedCardPreview card={draggedCard} position={dragPosition} />
      ) : null}
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
