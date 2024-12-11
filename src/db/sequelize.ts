import * as dotenv from "dotenv";
dotenv.config();
const Sequelize = require("sequelize-cockroachdb");

const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString);

export { sequelize };
