import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=verify-full`;
const sequelize = new Sequelize(connectionString);

export { sequelize };

//   try {
//     await sequelize.authenticate();
//     console.log(colors.green("Connection has been established successfully."));
//   } catch (error) {
//     console.error(
//       colors.red("Unable to connect to the database:"),
//       colors.yellow(error)
//     );
//   }
