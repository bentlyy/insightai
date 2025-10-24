import { prisma } from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";

class AuthService {
  async register(email: string, password: string, name?: string) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("El usuario ya existe");

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashed, name }
    });

    return { id: user.id, email: user.email, name: user.name };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Credenciales inválidas");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("Credenciales inválidas");

    const token = signToken({ userId: user.id });

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name }
    };
  }
}

export const authService = new AuthService();
