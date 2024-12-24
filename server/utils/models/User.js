/*!
 * Copyright (c) 2024 Rui Reogo
 * https://botforge-api.ruii.site/
 */

import { DataTypes, Model } from "@sequelize/core";
import bcrypt from "bcryptjs";

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        userID: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [3, 20],
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8, 100],
          },
        },
        profilePicture: {
          type: DataTypes.STRING,
          defaultValue: null,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );

    User.beforeCreate((user) => {
      if (!user.profilePicture) {
        user.profilePicture = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`;
      }
    });

    User.beforeCreate(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    });

    return User;
  }

  async validatePassword(inputPassword) {
    return bcrypt.compare(inputPassword, this.password);
  }
}

export default User;