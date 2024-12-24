/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import userModel from "./models/userModel";

class Utils {
  constructor() {
    this.sequelize = new Sequelize({
      dialect: PostgresDialect,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      ssl: true
    });
    
    this.userModel = userModel.initModel(sequelize);
    this.init();
  }
  
  async init() {
    // TODO: update into false if prod
    this.sequelize.sync({ force: true });
  }
  
  
}

export default Utils;