import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
// import { ProductsInterface } from "../services/createProducts";
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
