import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "user",
  }
);

export { User };
