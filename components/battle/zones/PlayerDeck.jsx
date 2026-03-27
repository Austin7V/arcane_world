import DeckStack from "./DeckStack";

export default function PlayerDeck({ cards }) {
  return <DeckStack cards={cards} tooltipLabel="Player Deck" />;
}
