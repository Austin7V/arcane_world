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
          sizes="(max-width: 768px) 120px, 180px"
          priority={false}
        />
      </CardImageWrapper>
    </CardWrapper>
  );
}

const CardWrapper = styled.button`
  position: relative;
  width: 200px;
  aspect-ratio: 2 / 3;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 16px;
  overflow: visible;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-24px) scale(1.08);
    z-index: 20;
    filter: brightness(1.05);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      transform: translateY(-18px) scale(1.04);
      z-index: 25;
      filter: brightness(1.08);
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
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.35));
`;
