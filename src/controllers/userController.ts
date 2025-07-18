import User from "../models/User";
import type { Request, Response } from "express";

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({ error: error.message });
      }

      const exist = await User.findOne({ email });

      if (exist) {
        const error = new Error("El usuario ya existe");
        return res.status(409).json({ error: error.message });
      }

      const user = new User({ name, email, password });
      await user.save();

      return res.status(201).json({
        message: "Usuario registrado correctamente",
      });
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  }
}
