/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import dotenv from "dotenv";

export function loadEnv() {
  dotenv.config();
}

export function checkEnv() {
  const {
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_HOST,
    JWT_KEY
  } = process.env;

  if (
    !DB_NAME &&
    !DB_USER &&
    !DB_PASS &&
    !DB_HOST &&
    !JWT_KEY
  ) {
    console.error(
      "Environment variables are not set correctly."
    );
    process.exit(1);
  }
}