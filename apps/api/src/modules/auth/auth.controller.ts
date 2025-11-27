// src/modules/auth/auth.controller.ts
import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.dto.js";
import { AuthService } from "./auth.service.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);
      const result = await AuthService.login(data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
