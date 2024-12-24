/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import * as utils from "./utils";
utils.loadEnv();
utils.checkEnv();

import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import User from "./models/User";
import Forge from "./models/Forge";
import ForgeMembers from "./models/ForgeMembers";

let sequelizeInstance;

async function connectDB() {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize({
      dialect: PostgresDialect,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      ssl: true
    });

    const user = User.initModel(sequelizeInstance);
    const forge = Forge.initModel(sequelizeInstance);
    const forgeMembers = ForgeMembers.initModel(sequelizeInstance);

    await sequelizeInstance.sync({ force: false });
  }
  return sequelizeInstance;
}

export default connectDB;