import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthBlock() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading authentication...</p>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.name}</p>
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
}
