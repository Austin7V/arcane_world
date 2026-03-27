import Image from "next/image";
import styled from "styled-components";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";
import getMonsterCardImage from "@/lib/game/cards/getMonsterCardImage";

export default function BattleTableCards({
  playedPlayerCardsOnTable,
  playedMonsterCardOnTable,
  playedMonsterActionType,
}) {
  const hasPlayerCards = playedPlayerCardsOnTable.length > 0;

  return (
    <TableCardsWrapper>
      {hasPlayerCards ? (
        <PlayerCardsSection cards={playedPlayerCardsOnTable} />
      ) : null}

      {!hasPlayerCards && playedMonsterCardOnTable ? (
        <MonsterCardSection
          card={playedMonsterCardOnTable}
          actionType={playedMonsterActionType}
        />
      ) : null}
    </TableCardsWrapper>
  );
}

function PlayerCardsSection({ cards }) {
  return (
    <PlayerCardsRow>
      {cards.map((card, index) => (
        <PlayerCardSlot key={`${card.id}-${index}`}>
          <CardImageWrapper>
            <CardImage
              src={getPlayerCardImage(card.id)}
              alt={card.name}
              fill
              sizes="200px"
              priority={false}
            />
          </CardImageWrapper>
        </PlayerCardSlot>
      ))}
    </PlayerCardsRow>
  );
}

function MonsterCardSection({ card, actionType }) {
  return (
    <MonsterCardWrapper>
      <CardImageWrapper>
        <CardImage
          src={getMonsterCardImage(card.id)}
          alt={card.name}
          fill
          sizes="200px"
          priority={false}
        />
        {actionType === "strike" && (
          <MonsterActionGlow $top={80} $height={59} />
        )}
        {actionType === "bite" && <MonsterActionGlow $top={200} $height={70} />}
      </CardImageWrapper>
    </MonsterCardWrapper>
  );
}

const TableCardsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1400px;
`;

const PlayerCardsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  transform: rotateX(16deg) scaleY(0.92);
  transform-style: preserve-3d;
`;

const PlayerCardSlot = styled.div`
  position: relative;
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 200px;
  aspect-ratio: 2 / 3;
  filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.38));
`;

const CardImage = styled(Image)`
  object-fit: contain;
  user-select: none;
`;

const MonsterCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: rotateX(16deg) scaleY(0.92);
  transform-style: preserve-3d;
`;

const MonsterActionGlow = styled.div`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: 19px;
  right: 19px;
  height: ${({ $height }) => $height}px;
  border-radius: 15px;
  pointer-events: none;
  box-shadow:
    inset 0 18px 34px rgba(255, 40, 40, 0.22),
    0 0 16px rgba(255, 40, 40, 0.4);
`;
