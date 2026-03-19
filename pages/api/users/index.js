import dbConnect from "../../../lib/db/connectToDatabase";
import User from "@/lib/db/models/User";

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const {
        googleId,
        name,
        email,
        image,
        activeGameState,
        totalWins,
        totalLosses,
        currentStage,
      } = req.body;

      if (!googleId || !name || !email) {
        return res.status(400).json({
          message: "googleId, name, and email are required",
        });
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
      } else {
        user.name = name;
        user.email = email;
        user.image = image || user.image;
        user.totalWins = totalWins ?? user.totalWins;
        user.totalLosses = totalLosses ?? user.totalLosses;
        user.currentStage = currentStage ?? user.currentStage;
        user.activeGameState =
          activeGameState !== undefined
            ? activeGameState
            : user.activeGameState;

        await user.save();
      }

      return res.status(200).json({
        message: "User loaded successfully",
        user,
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("User API error:", error);

    return res.status(500).json({
      message: "Something went wrong while loading the user",
      error: error.message,
    });
  }
}
