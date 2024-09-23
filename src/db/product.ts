import { DataTypes, Model } from "sequelize";
import { sequelize } from "./index";
import { ProductsInterface } from "../services/createProducts";
class Product extends Model {}
Product.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.DATE,
    category: DataTypes.STRING,
    price: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "product",
  }
);

export { Product };
