import Image from "next/image";
import styled from "styled-components";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";

export default function BattleTableCards({
  playedPlayerCardsOnTable,
  playedMonsterCardOnTable,
}) {
  const hasPlayerCards = playedPlayerCardsOnTable.length > 0;

  return (
    <TableCardsWrapper>
      {hasPlayerCards ? (
        <PlayerCardsRow>
          {playedPlayerCardsOnTable.map((card, index) => (
            <PlayerCardSlot key={`${card.id}-${index}`} $index={index}>
              <PlayedPlayerCardImageWrapper>
                <PlayedPlayerCardImage
                  src={getPlayerCardImage(card.id)}
                  alt={card.name}
                  fill
                  sizes="200px"
                  priority={false}
                />
              </PlayedPlayerCardImageWrapper>
            </PlayerCardSlot>
          ))}
        </PlayerCardsRow>
      ) : null}

      {!hasPlayerCards && playedMonsterCardOnTable ? (
        <MonsterCardWrapper>
          <CardLabel>Monster Card</CardLabel>
          <MonsterPlaceholderCard>
            {playedMonsterCardOnTable.name}
          </MonsterPlaceholderCard>
        </MonsterCardWrapper>
      ) : null}
    </TableCardsWrapper>
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

const PlayedPlayerCardImageWrapper = styled.div`
  position: relative;
  width: 160px;
  aspect-ratio: 2 / 3;
  filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.38));
`;

const PlayedPlayerCardImage = styled(Image)`
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

const CardLabel = styled.p`
  margin: 0 0 10px;
  text-align: center;
  font-size: 14px;
  color: rgba(243, 246, 251, 0.82);
`;

const MonsterPlaceholderCard = styled.div`
  width: 220px;
  aspect-ratio: 2 / 3;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 16, 28, 0.72);
  color: #f3f6fb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  text-align: center;
  box-shadow: 0 14px 22px rgba(0, 0, 0, 0.28);
`;
