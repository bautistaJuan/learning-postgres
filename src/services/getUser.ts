import { User } from "../db/user";
async function getUser(email: string) {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    throw error;
  } finally {
    console.log("finally");
  }
}

export default getUser;
