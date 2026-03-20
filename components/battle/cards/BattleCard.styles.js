import styled, { css } from "styled-components";

export const CardButton = styled.button`
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

export const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const StyledCardImage = styled.div`
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.35));
`;
