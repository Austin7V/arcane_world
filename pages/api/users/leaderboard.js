import connectToDatabase from "../../../lib/db/connectToDatabase";
import User from "../../../lib/db/models/User";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const users = await User.find({})
      .select("nickname name totalWins totalLosses image")
      .sort({
        totalWins: -1,
        totalLosses: 1,
        nickname: 1,
        name: 1,
      })
      .lean();

    const leaderboard = users.map((user, index) => {
      return {
        rank: index + 1,
        id: user._id.toString(),
        nickname: user.nickname || user.name || "Unknown Player",
        image: user.image || "",
        totalWins: user.totalWins || 0,
        totalLosses: user.totalLosses || 0,
      };
    });

    return response.status(200).json({
      message: "Leaderboard loaded successfully",
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard API error:", error);

    return response.status(500).json({
      message: "Something went wrong while loading leaderboard",
    });
  }
}
