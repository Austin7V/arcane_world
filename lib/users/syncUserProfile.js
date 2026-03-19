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
    incrementLosses,
  } = profileData;

  if (!googleId || !name || !email) {
    const error = new Error("googleId, name, and email are required");
    error.statusCode = 400;
    throw error;
  }

  let existingUser = await User.findOne({ googleId });

  if (!existingUser) {
    const createdUser = await User.create({
      googleId,
      name,
      email,
      image: image || "",
      nickname: name,
      totalWins: totalWins ?? 0,
      totalLosses: totalLosses ?? 0,
      currentStage: currentStage ?? 1,
      activeGameState: activeGameState ?? null,
    });

    return createdUser;
  }

  existingUser.name = name;
  existingUser.email = email;
  existingUser.image = image || existingUser.image;
  existingUser.totalWins = totalWins ?? existingUser.totalWins;
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
