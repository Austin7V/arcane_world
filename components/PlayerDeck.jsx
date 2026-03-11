import styled from "styled-components";

export default function PlayerDeck({ cards }) {
  return (
    <DeckWrapper>
      <DeckTitle>Player Deck</DeckTitle>
      <DeckCount>{cards.length} cards</DeckCount>
    </DeckWrapper>
  );
}

const DeckWrapper = styled.div`
  min-width: 160px;
  padding: 20px;
  border: 1px solid white;
  border-radius: 12px;
  text-align: center;
`;

const DeckTitle = styled.h3`
  margin: 0 0 8px;
`;

const DeckCount = styled.p`
  margin: 0;
`;
