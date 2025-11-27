// src/middlewares/errorHandler.ts
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction
): void {
  console.error(err);

  if (err instanceof ZodError) {
    res.status(400).json({
      message: "Error de validación",
      errors: err.flatten(),
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
  });
}
