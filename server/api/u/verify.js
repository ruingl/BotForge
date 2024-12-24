import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ message: "Token is valid", decoded });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}