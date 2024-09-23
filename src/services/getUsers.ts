import { User } from "../db/user";
const colors = require("colors");

async function getUsers() {
  try {
    const usersData = await User.findAll(); // Para traer todos los usuarios
    const values = usersData.map(user => {
      return user.dataValues; // Devuelve solamente los usuarios
    });
    console.log(colors.green("Users data:", values));

    return values;
  } catch (error) {
    throw new Error("Error getting users from db");
  }
}

export default getUsers;
