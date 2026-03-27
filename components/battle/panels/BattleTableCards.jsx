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
          <MonsterPlayedCardImageWrapper>
            <MonsterPlayedCardImage
              src={getMonsterCardImage(playedMonsterCardOnTable.id)}
              alt={playedMonsterCardOnTable.name}
              fill
              sizes="200px"
              priority={false}
            />
            {playedMonsterActionType === "strike" ? (
              <MonsterActionGlowTop />
            ) : null}
            {playedMonsterActionType === "bite" ? (
              <MonsterActionGlowBottom />
            ) : null}
          </MonsterPlayedCardImageWrapper>
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
  width: 200px;
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

const MonsterPlayedCardImageWrapper = styled.div`
  position: relative;
  width: 200px;
  aspect-ratio: 2 / 3;
  filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.38));
`;

const MonsterPlayedCardImage = styled(Image)`
  object-fit: contain;
  user-select: none;
`;

const MonsterActionGlowTop = styled.div`
  position: absolute;
  top: 80px;
  left: 19px;
  right: 19px;
  height: 59px;
  border-radius: 15px 15px 15px 15px;
  pointer-events: none;
  box-shadow:
    inset 0 18px 34px rgba(255, 40, 40, 0.22),
    0 0 16px rgba(255, 40, 40, 0.4);
`;

const MonsterActionGlowBottom = styled.div`
  position: absolute;
  top: 200px;
  left: 19px;
  right: 19px;
  height: 70px;
  border-radius: 15px 15px 15px 15px;
  pointer-events: none;
  box-shadow:
    inset 0 18px 34px rgba(255, 40, 40, 0.22),
    0 0 16px rgba(255, 40, 40, 0.4);
`;
