import connectToDatabase from "../../../lib/db/connectToDatabase";
import syncUserProfile from "../../../lib/users/syncUserProfile";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const user = await syncUserProfile(request.body);

    return response.status(200).json({
      message: "User loaded successfully",
      user,
    });
  } catch (error) {
    console.error("User API error:", error);

    return response.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong while loading the user",
    });
  }
}
