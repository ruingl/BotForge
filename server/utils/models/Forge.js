/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import { DataTypes, Model } from "@sequelize/core";
import User from "./User";

class Forge extends Model {
  static initModel(sequelize) {
    Forge.init(
      {
        forgeID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        forgePicture: {
          type: DataTypes.STRING,
          defaultValue: null,
        },
      },
      {
        sequelize,
        modelName: "Forge",
        tableName: "forges",
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );

    Forge.beforeCreate((forge) => {
      if (!forge.forgePicture) {
        forge.forgePicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(forge.name)}`;
      }
    });

    Forge.belongsToMany(User, {
      through: "ForgeMembers",
      foreignKey: "forgeID",
      as: "members"
    });

    User.belongsToMany(Forge, {
      through: "ForgeMembers",
      foreignKey: "userID",
      as: "forges"
    });

    return Forge;
  }
}

export default Forge;