import { Database } from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const _db = new Database();
    const { userModel, sequelize } = await _db.init();

    const existingUser = await userModel.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    const newUser = await userModel.create({ username, password });
    res.status(201).json({ message: "User created successfully", userID: newUser.userID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}