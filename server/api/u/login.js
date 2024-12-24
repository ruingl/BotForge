import jwt from "jsonwebtoken";
import { Database } from "../../utils/connectDB";

const SECRET_KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const _db = new Database();
    const { userModel, sequelize } = await _db.init();

    const user = await userModel.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ userID: user.userID, username: user.username }, SECRET_KEY);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}