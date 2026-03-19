import dbConnect from "../../../lib/db/connectToDatabase";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const { googleId, name, email, image } = req.body;

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
        totalWins: 0,
        totalLosses: 0,
        currentStage: 1,
      });
    }

    return res.status(200).json({
      message: "User loaded successfully",
      user,
    });
  } catch (error) {
    console.error("User API error:", error);

    return res.status(500).json({
      message: "Something went wrong while loading the user",
      error: error.message,
    });
  }
}
