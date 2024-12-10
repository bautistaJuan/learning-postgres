import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

// id: DataTypes.INTEGER,
// password: DataTypes.STRING,
class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "User",
  }
);

export { User };
