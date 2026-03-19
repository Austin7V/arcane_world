import connectToDatabase from "../../../lib/db/connectToDatabase";
import User from "../../../lib/db/models/User";
import syncUserProfile from "../../../lib/users/syncUserProfile";

export default async function handler(request, response) {
  try {
    await connectToDatabase();

    if (request.method === "GET") {
      const { googleId } = request.query;

      if (!googleId) {
        return response.status(400).json({
          message: "googleId is required",
        });
      }

      const user = await User.findOne({ googleId });

      if (!user) {
        return response.status(404).json({
          message: "User not found",
        });
      }

      return response.status(200).json({
        message: "User loaded successfully",
        user,
      });
    }

    if (request.method === "POST") {
      const user = await syncUserProfile(request.body);

      return response.status(200).json({
        message: "User loaded successfully",
        user,
      });
    }

    return response.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("User API error:", error);

    return response.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong while loading the user",
    });
  }
}
