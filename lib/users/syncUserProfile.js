import User from "../db/models/User";

export default async function syncUserProfile(data) {
  const {
    googleId,
    name,
    email,
    image,
    activeGameState,
    totalWins,
    totalLosses,
    currentStage,
  } = data;

  if (!googleId || !name || !email) {
    const error = new Error("googleId, name, and email are required");
    error.statusCode = 400;
    throw error;
  }

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.create({
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

    return user;
  }

  user.name = name;
  user.email = email;
  user.image = image || user.image;
  user.totalWins = totalWins ?? user.totalWins;
  user.totalLosses = totalLosses ?? user.totalLosses;
  user.currentStage = currentStage ?? user.currentStage;
  user.activeGameState =
    activeGameState !== undefined ? activeGameState : user.activeGameState;

  await user.save();

  return user;
}
