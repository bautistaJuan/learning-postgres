import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

class Product extends Model {}
Product.init(
  {
    title: DataTypes.STRING,
    // description: DataTypes.DATE,
    price: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "product",
  }
);

export { Product };
