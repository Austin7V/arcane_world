import connectToDatabase from "../../lib/db/connectToDatabase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    return res.status(200).json({
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      message: "Database connection failed",
    });
  }
}
