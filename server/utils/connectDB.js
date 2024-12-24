/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import userModel from "./models/userModel";

/**
 * how 2 uze:
 * const _db = new Database();
 * const db = _db.init();
 */
class Database {
  constructor() {
    this.sequelize = new Sequelize({
      // u can change dialects if u
      // dont use postgres
      dialect: PostgresDialect,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      
      // update if u dont have ssl
      ssl: true
    });
    
    this.userModel = userModel.initModel(
      this.sequelize
    );
  }
  
  async init() {
    // TODO: update into false if prod
    await this.sequelize.sync({ force: true });
    return { 
      userModel: this.userModel,
      sequelize: this.sequelize 
    };
  }
}

export default Database;