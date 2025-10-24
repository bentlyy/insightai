import { Request, Response } from "express";
import { authService } from "./auth.service.js";

class AuthController {
  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    try {
      const user = await authService.register(email, password, name);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const data = await authService.login(email, password);
      return res.json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
