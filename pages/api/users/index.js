import dbConnect from "../../../lib/db/connectToDatabase";
import syncUserProfile from "../../../lib/users/syncUserProfile";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const user = await syncUserProfile(req.body);

    return res.status(200).json({
      message: "User loaded successfully",
      user,
    });
  } catch (error) {
    console.error("User API error:", error);

    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong while loading the user",
    });
  }
}
