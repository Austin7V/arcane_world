import Image from "next/image";
import styled from "styled-components";

const battleLogIcons = {
  strike: "/icons/battle-log/strike.png",
  bite: "/icons/battle-log/bite.png",
  damage: "/icons/battle-log/damage.png",
  armor: "/icons/battle-log/armor.png",
  draw: "/icons/battle-log/draw.png",
};

export default function BattleLog({ messages }) {
  return (
    <Wrapper>
      <LogList>
        {messages.map((message) => (
          <LogItem key={message.id}>
            <LogIconWrapper>
              <LogIcon
                src={battleLogIcons[message.type]}
                alt={message.type}
                fill
                sizes="36px"
                priority={false}
              />
            </LogIconWrapper>
          </LogItem>
        ))}
      </LogList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const LogList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 4px;
`;

const LogItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogIconWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.35));
`;

const LogIcon = styled(Image)`
  object-fit: contain;
  user-select: none;
`;
