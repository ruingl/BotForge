/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import * as utils from "../../utils/utils";
utils.loadEnv();
utils.checkEnv();

import { connectDB } from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    const { user, sequelize } = await connectDB();

    const existingUser = await user.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    const newUser = await user.create({ username, password });
    res.status(201).json({ message: "User created successfully", userID: newUser.userID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}