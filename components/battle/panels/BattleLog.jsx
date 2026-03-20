import styled from "styled-components";

export default function BattleLog({ messages }) {
  return (
    <Wrapper>
      <Title>Battle Log</Title>
      <LogList>
        {messages.map((message, index) => (
          <LogItem key={index}>{message}</LogItem>
        ))}
      </LogList>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  border: 1px solid white;
  border-radius: 12px;
  padding: 16px;
`;

const Title = styled.h3`
  margin: 0 0 12px;
`;

const LogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LogItem = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.3;
`;
