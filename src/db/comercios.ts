import { DataTypes, Model } from "sequelize";
import { sequelize } from "./sequelize";

class Comercio extends Model {}
Comercio.init(
  {
    nombre: DataTypes.STRING,
    rubro: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "Comercio",
  }
);

export { Comercio };
