export default function createUserSyncPayload(
  sessionUser,
  additionalData = {}
) {
  if (!sessionUser?.email || !sessionUser?.name) {
    return null;
  }

  return {
    googleId: sessionUser.email,
    name: sessionUser.name,
    email: sessionUser.email,
    image: sessionUser.image || "",
    ...additionalData,
  };
}
