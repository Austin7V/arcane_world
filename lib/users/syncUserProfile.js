import User from "../db/models/User";

export default async function syncUserProfile(profileData) {
  const {
    googleId,
    name,
    email,
    image,
    activeGameState,
    totalWins,
    totalLosses,
    currentStage,
    incrementWins,
    incrementLosses,
  } = profileData;

  if (!googleId || !name || !email) {
    const error = new Error("googleId, name, and email are required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ googleId });

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  existingUser.name = name;
  existingUser.email = email;
  existingUser.image = image || existingUser.image;
  if (incrementWins) {
    existingUser.totalWins += 1;
  } else {
    existingUser.totalWins = totalWins ?? existingUser.totalWins;
  }
  if (incrementLosses) {
    existingUser.totalLosses += 1;
  } else {
    existingUser.totalLosses = totalLosses ?? existingUser.totalLosses;
  }
  existingUser.currentStage = currentStage ?? existingUser.currentStage;
  existingUser.activeGameState =
    activeGameState !== undefined
      ? activeGameState
      : existingUser.activeGameState;

  await existingUser.save();

  return existingUser;
}
