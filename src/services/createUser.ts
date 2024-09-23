import { User } from "../db/user";
const colors = require("colors");

interface UserInterface {
  name: string;
  lastName: string;
  birthDay: Date;
  email: string;
}

export default async function createUser({
  name,
  lastName,
  birthDay,
  email,
}: UserInterface) {
  try {
    const newUser = await User.create({
      name: name,
      lastName: lastName,
      birthDay: birthDay,
      email: email,
    });
    console.log(colors.green("User created successfully", newUser.toJSON()));
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
