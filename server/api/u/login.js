/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import * as utils from "../../utils/utils";
utils.loadEnv();
utils.checkEnv();

import jwt from "jsonwebtoken";
import { connectDB } from "../../utils/connectDB";

const SECRET_KEY = process.env.JWT_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const { sequelize, UserModel } = await connectDB();

    const userExists = await UserModel.findOne({ where: { username } });
    if (!userExists || !(await userExists.validatePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userID: userExists.userID, username: userExists.username },
      SECRET_KEY
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}