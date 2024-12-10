import { User } from "../src/db/user";
const colors = require("colors");

interface UserInterface {
  name: string;
  email: string;
  password: string;
  birthDay: Date;
}

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

async function createUser({ name, email, password, birthDay }: UserInterface) {
  try {
    const newUser = await User.create({
      name: name,
      password: password,
      birthDay: birthDay,
      email: email,
    });
    console.log(colors.green("User created successfully", newUser.toJSON()));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

export { getUsers, createUser };
