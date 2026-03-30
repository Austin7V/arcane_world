import { useEffect, useState } from "react";
import styled from "styled-components";

export default function LeaderboardModal({ isOpen, onClose }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    async function loadLeaderboard() {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch("/api/users/leaderboard");

        if (!response.ok) {
          throw new Error("Failed to load leaderboard");
        }

        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      } catch (error) {
        console.error("Failed to load leaderboard:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadLeaderboard();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <ModalPanel onClick={(event) => event.stopPropagation()}>
        <Header>
          <Title>Leaderboard</Title>
          <CloseButton onClick={onClose} type="button">
            ×
          </CloseButton>
        </Header>

        {isLoading && <InfoText>Loading leaderboard...</InfoText>}

        {hasError && (
          <InfoText>Failed to load leaderboard. Please try again.</InfoText>
        )}

        {!isLoading && !hasError && leaderboard.length === 0 && (
          <InfoText>No players found yet.</InfoText>
        )}

        {!isLoading && !hasError && leaderboard.length > 0 && (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <TableHead>#</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Wins</TableHead>
                  <TableHead>Losses</TableHead>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.rank}</TableCell>
                    <PlayerCell>
                      <PlayerInfo>
                        {player.image ? (
                          <Avatar src={player.image} alt={player.nickname} />
                        ) : (
                          <AvatarPlaceholder>
                            {player.nickname.charAt(0).toUpperCase()}
                          </AvatarPlaceholder>
                        )}
                        <PlayerName>{player.nickname}</PlayerName>
                      </PlayerInfo>
                    </PlayerCell>
                    <TableCell>{player.totalWins}</TableCell>
                    <TableCell>{player.totalLosses}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </ModalPanel>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
`;

const ModalPanel = styled.div`
  width: min(900px, 100%);
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(8, 12, 20, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  margin: 0;
  color: #f3f6fb;
  font-size: 28px;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #f3f6fb;
  font-size: 30px;
  cursor: pointer;
`;

const InfoText = styled.p`
  margin: 0;
  padding: 28px 24px;
  color: #d9e2f2;
  font-size: 18px;
`;

const TableWrapper = styled.div`
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  padding: 16px 20px;
  text-align: left;
  color: #8fb6ff;
  font-size: 15px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
`;

const TableCell = styled.td`
  padding: 16px 20px;
  color: #f3f6fb;
  font-size: 16px;
`;

const PlayerCell = styled(TableCell)`
  min-width: 260px;
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarPlaceholder = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(90, 170, 255, 0.2);
  color: #f3f6fb;
  font-weight: 700;
`;

const PlayerName = styled.span`
  color: #f3f6fb;
  font-weight: 600;
`;
