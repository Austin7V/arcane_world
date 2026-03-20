import Image from "next/image";
import styled, { css } from "styled-components";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";

export default function PlayerHandCard({ card, onSelectCard, isSelected }) {
  const imageSrc = getPlayerCardImage(card.id);

  return (
    <CardWrapper onClick={() => onSelectCard(card)} $isSelected={isSelected}>
      <CardImageWrapper>
        <StyledCardImage
          src={imageSrc}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 140px, 200px"
          priority={false}
        />
        {isSelected ? <SelectedGlow /> : null}
      </CardImageWrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.button`
  position: relative;
  width: 210px;
  aspect-ratio: 2 / 3;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 18px;
  overflow: visible;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-30px) scale(1.4);
    z-index: 20;
    filter: brightness(1.06);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      transform: translateY(-42px) scale(1.12);
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
  border-radius: 18px;
  pointer-events: none;
  z-index: 1;
  box-shadow:
    0 0 0 1px rgba(140, 220, 255, 0.95),
    0 0 18px rgba(110, 200, 255, 0.75),
    0 0 36px rgba(80, 150, 255, 0.45);
`;
