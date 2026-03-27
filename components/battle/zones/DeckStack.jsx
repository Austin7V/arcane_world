import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

export default function DeckStack({ cards, tooltipLabel }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StackArea>
        {cards.map((card, index) => (
          <CardBackWrapper
            key={`${card.id}-${index}`}
            $index={index}
            $total={cards.length}
          >
            <StyledCardBack
              src="/cards/card_back.png"
              alt="Card back"
              fill
              sizes="132px"
              priority={false}
            />
          </CardBackWrapper>
        ))}
      </StackArea>

      {isHovered ? (
        <Tooltip>
          {tooltipLabel}: {cards.length}
        </Tooltip>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 132px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const StackArea = styled.div`
  position: relative;
  width: 132px;
  height: 178px;
`;

const CardBackWrapper = styled.div`
  position: absolute;
  inset: 0;
  transform: ${({ $index, $total }) => {
    const maxOffset = Math.min($total - 1, 10);
    const visualIndex = Math.min($index, 10);

    const x = visualIndex * 2;
    const y = visualIndex * -2;
    const rotate = visualIndex * 0.8;

    return `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  }};
  transform-origin: center center;
`;

const StyledCardBack = styled(Image)`
  object-fit: contain;
  user-select: none;
  filter: drop-shadow(0 8px 14px rgba(0, 0, 0, 0.35));
`;

const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 12px);
  transform: translateX(-50%);
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(10, 14, 22, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f3f6fb;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 50;
`;
