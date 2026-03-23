import Image from "next/image";
import styled from "styled-components";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";

export default function HoveredCardPreview({ card, previewX }) {
  if (!card) return null;

  const imageSrc = getPlayerCardImage(card.id);

  return (
    <PreviewWrapper style={{ left: `${previewX}px` }}>
      <PreviewCard>
        <StyledPreviewImage
          src={imageSrc}
          alt={card.name}
          fill
          sizes="320px"
          priority={false}
        />
      </PreviewCard>
    </PreviewWrapper>
  );
}

const PreviewWrapper = styled.div`
  position: absolute;
  top: -410px;
  transform: translateX(-50%);
  z-index: 300;
  pointer-events: none;
  transition: left 0.14s ease;
`;

const PreviewCard = styled.div`
  position: relative;
  width: 420px;
  aspect-ratio: 2 / 3;
  border-radius: 24px;
  filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.55));
`;

const StyledPreviewImage = styled(Image)`
  object-fit: contain;
  user-select: none;
`;
