import Image from "next/image";
import styled from "styled-components";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";

export default function DraggedCardPreview({ card, position }) {
  if (!card) return null;

  const imageSrc = getPlayerCardImage(card.id);

  return (
    <PreviewWrapper
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <PreviewCard>
        <StyledPreviewImage
          src={imageSrc}
          alt={card.name}
          fill
          sizes="260px"
          priority={false}
        />
      </PreviewCard>
    </PreviewWrapper>
  );
}

const PreviewWrapper = styled.div`
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 9999;
  pointer-events: none;
`;

const PreviewCard = styled.div`
  position: relative;
  width: 260px;
  aspect-ratio: 2 / 3;
  border-radius: 22px;
  filter: drop-shadow(0 18px 26px rgba(0, 0, 0, 0.45));
`;

const StyledPreviewImage = styled(Image)`
  object-fit: contain;
  user-select: none;
`;
