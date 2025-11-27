// src/utils/jwt.ts
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload {
  userId: string;
}

// Aseguramos que el secret tiene el tipo correcto
const JWT_SECRET: Secret = env.JWT_SECRET;

// 7 días en segundos
const DEFAULT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7; // 7d

export function signToken(
  payload: JwtPayload,
  expiresIn: number = DEFAULT_EXPIRES_IN_SECONDS
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
