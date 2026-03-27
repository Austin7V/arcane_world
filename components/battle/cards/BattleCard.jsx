import Image from "next/image";
import getPlayerCardImage from "@/lib/game/cards/getPlayerCardImage";
import {
  CardButton,
  CardImageWrapper,
  StyledCardImage,
} from "./BattleCard.styles";

export default function BattleCard({ card, isSelected = false, onClick }) {
  const imageSrc = getPlayerCardImage(card.id);

  return (
    <CardButton
      type="button"
      $isSelected={isSelected}
      onClick={() => onClick?.(card)}
    >
      <CardImageWrapper>
        <StyledCardImage
          as={Image}
          src={imageSrc}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 140px, 180px"
          priority={false}
        />
      </CardImageWrapper>
    </CardButton>
  );
}
