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

async function connectDB() {
  const sequelize = new Sequelize({
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

  const user = User.initModel(sequelize);
  const forge = Forge.initModel(sequelize);
  const forgeMembers = ForgeMembers.initModel(sequelize);

  await sequelize.sync({ force: true });
  return { sequelize, user, forge, forgeMembers };
}

export default { connectDB };
