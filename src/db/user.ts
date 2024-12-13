import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    userId: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "user",
  }
);

export { User };
