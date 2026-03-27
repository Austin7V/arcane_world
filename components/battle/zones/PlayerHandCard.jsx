import Image from "next/image";
import styled, { css } from "styled-components";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";

export default function PlayerHandCard({
  card,
  onSelectCard,
  isSelected,
  onHoverCard,
  onLeaveCard,
  onStartDrag,
  isDragging,
  canDrag,
}) {
  const imageSrc = getPlayerCardImage(card.id);

  return (
    <CardWrapper
      type="button"
      onClick={() => onSelectCard(card)}
      onMouseEnter={(event) => onHoverCard?.(card, event)}
      onMouseLeave={() => onLeaveCard?.()}
      onMouseDown={(event) => onStartDrag?.(card, event)}
      $isSelected={isSelected}
      $isDragging={isDragging}
      $canDrag={canDrag}
    >
      <CardImageWrapper>
        {isSelected ? <SelectedGlow /> : null}
        <StyledCardImage
          src={imageSrc}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 220px, 260px"
          priority={false}
        />
      </CardImageWrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.button`
  position: relative;
  width: 220px;
  aspect-ratio: 2 / 3;
  padding: 0;
  border: none;
  background: transparent;
  cursor: ${({ $canDrag }) => ($canDrag ? "grab" : "default")};
  border-radius: 18px;
  overflow: visible;
  transition:
    transform 0.2s ease,
    filter 0.2s ease,
    opacity 0.2s ease;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

  &:hover {
    transform: translateY(-24px) scale(1.08);
    z-index: 20;
    filter: brightness(1.06);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      transform: translateY(-34px) scale(1.12);
      z-index: 50;
      filter: brightness(1.12);
    `}
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledCardImage = styled(Image)`
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  border-radius: 18px;
  z-index: 2;
  filter: drop-shadow(0 12px 20px rgba(0, 0, 0, 0.4));
`;

const SelectedGlow = styled.div`
  position: absolute;
  inset: 12px;
  border-radius: 26px;
  pointer-events: none;
  z-index: 1;
  box-shadow:
    0 0 24px rgba(110, 200, 255, 0.55),
    0 0 48px rgba(80, 150, 255, 0.4),
    0 0 72px rgba(60, 120, 255, 0.25);
`;
