import { User } from "../db/user";

async function deleteUser(email: string) {
  try {
    const result = await User.destroy({
      where: { email },
    });

    if (result === 0) {
      return false; // Usuario no encontrado
    }

    return true; // Usuario eliminado exitosamente
  } catch (error) {
    throw error; // Lanza el error original
  }
}

export default deleteUser;
