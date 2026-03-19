import { useEffect, useState } from "react";
import styled from "styled-components";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGame } from "../context/GameContext";

export default function AuthBlock() {
  const { data: session, status } = useSession();
  const { setGameState } = useGame();
  const [profileStatus, setProfileStatus] = useState("idle");

  useEffect(() => {
    async function syncUserProfile() {
      if (!session?.user?.email || !session?.user?.name) {
        return;
      }

      try {
        setProfileStatus("loading");

        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            googleId: session.user.email,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image || "",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to sync user profile");
        }

        setProfileStatus("success");
      } catch (error) {
        console.error("Profile sync error:", error);
        setProfileStatus("error");
      }
    }

    if (session) {
      syncUserProfile();
    }
  }, [session]);

  if (status === "loading") {
    return <StatusText>Loading authentication...</StatusText>;
  }

  if (session) {
    return (
      <Wrapper>
        <UserInfo>
          {session.user?.image ? (
            <Avatar
              src={session.user.image}
              alt={session.user?.name || "User avatar"}
            />
          ) : null}

          <TextGroup>
            <UserName>{session.user?.name}</UserName>
            <UserEmail>{session.user?.email}</UserEmail>
            <ProfileStatusText>
              {profileStatus === "loading" && "Syncing profile..."}
              {profileStatus === "success" && "Profile ready"}
              {profileStatus === "error" && "Profile sync failed"}
            </ProfileStatusText>
          </TextGroup>
        </UserInfo>

        <AuthButton
          type="button"
          onClick={() => {
            setGameState(null);
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign out
        </AuthButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <AuthButton
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        Sign in with Google
      </AuthButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.p`
  margin: 0;
  color: #f3f6fb;
  font-size: 16px;
  font-weight: 700;
`;

const UserEmail = styled.p`
  margin: 0;
  color: rgba(243, 246, 251, 0.72);
  font-size: 13px;
`;

const StatusText = styled.p`
  margin: 0;
  color: #f3f6fb;
  font-size: 14px;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const AuthButton = styled.button`
  padding: 14px 20px;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const ProfileStatusText = styled.p`
  margin: 0;
  color: rgba(90, 170, 255, 0.9);
  font-size: 12px;
`;
