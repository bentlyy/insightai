// src/modules/auth/auth.service.ts
import prisma from "../../config/prisma.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";
import { LoginInput, RegisterInput } from "./auth.dto.js";

export class AuthService {
  static async register(input: RegisterInput) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new Error("Email ya registrado");
    }

    const passwordHashed = await hashPassword(input.password);

    // name es opcional, solo lo mandamos si viene definido
    const { name, email } = input;

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHashed, // 👈 coincide con el schema
        ...(name ? { name } : {}), // solo setea name si existe
      },
    });

    const token = signToken({ userId: user.id });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name, // puede ser null/undefined
      },
      token,
    };
  }

  static async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Comparamos contra user.password (campo del schema)
    const isValid = await comparePassword(input.password, user.password);

    if (!isValid) {
      throw new Error("Credenciales inválidas");
    }

    const token = signToken({ userId: user.id });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
