/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import { DataTypes, Model } from "@sequelize/core";
import User from "./User";
import Forge from "./Forge";

class ForgeMembers extends Model {
  static initModel(sequelize) {
    ForgeMembers.init(
      {
        userID: {
          type: DataTypes.INTEGER,
          references: {
            model: User,
            key: 'userID'
          }
        },
        forgeID: {
          type: DataTypes.INTEGER,
          references: {
            model: Forge,
            key: 'forgeID'
          }
        },
        role: {
          type: DataTypes.ENUM("member", "mod", "admin"),
          defaultValue: "member",
        }
      },
      {
        sequelize,
        modelName: "ForgeMembers",
        tableName: "forge_members",
        timestamps: false,
      }
    );

    return ForgeMembers;
  }
}

export default ForgeMembers;
