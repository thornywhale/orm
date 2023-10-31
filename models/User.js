"use strict";
const { isAfter } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: "first_name",
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: "last_name",
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(), new Date(value))) {
              throw new Error("check birthday");
            }
          },
          isAfter: "1900-01-01", // do not use "new Date() cause it depends on non-current date"
        },
      },
      isMale: {
        field: "is_male",
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
