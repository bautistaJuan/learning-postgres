import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";
// import { ProductsInterface } from "../services/createProducts";
class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    birthdate: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

export { User };
