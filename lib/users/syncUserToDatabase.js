export default async function syncUserToDatabase(requestBody) {
  if (!requestBody) {
    return null;
  }

  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Failed to sync user data");
  }

  return response.json();
}
