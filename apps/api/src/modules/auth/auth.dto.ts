// src/modules/auth/auth.dto.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  // name es opcional, porque en el schema es String?
  name: z.string().min(2, "Nombre muy corto").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export type LoginInput = z.infer<typeof loginSchema>;
