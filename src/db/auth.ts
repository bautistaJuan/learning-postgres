import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";

class Auth extends Model {}
Auth.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Auth",
  }
);

export { Auth };
