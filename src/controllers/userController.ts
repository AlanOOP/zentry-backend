import type { Request, Response } from "express";
import slug from "slug";
import User, { IUser } from "../models/User";
import { hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";

export class UserController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { handle, name, email, password }: IUser = req.body;

      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const exist = await User.findOne({ email });
      const existHandle = await User.findOne({ handle });

      if (exist || existHandle) {
        const error = new Error("El usuario o el handle ya existen");
        return res.status(409).json({ error: error.message });
      }

      const handleSlug = slug(handle, "");

      const user = new User({ handle: handleSlug, name, email, password });
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      await user.save();

      return res.status(201).json({
        message: "Usuario registrado correctamente",
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
