import type { Request, Response } from "express";
import slug from "slug";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export class UserController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { handle, name, email, password }: IUser = req.body;


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

      return res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;


      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({ error: error.message });
      }

      const isMatch = await checkPassword(password, user.password);
      if (!isMatch) {
        const error = new Error("Contraseña incorrecta");
        return res.status(401).json({ error: error.message });
      }

      const token = generateJWT({ id: user._id, email: user.email });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUserProfile(req: Request, res: Response): Promise<Response> {
    req.user = req.user as IUser;
    return res.status(200).json(req.user);
  }

  static async updateUserProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { handle, description } = req.body;
      const user  : IUser = req.user!;

      const newHandle = slug(handle, "");

      const userExistHandle : IUser | null = await User.findOne({ handle: newHandle });

      if (userExistHandle && userExistHandle.email !== user.email) {
        const error = new Error("El handle ya está en uso");
        return res.status(409).json({ error: error.message });
      }

      user.handle = newHandle;
      user.description = description;

      await user.save();

      return res.status(200).json({ message: "Perfil actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateUserAvatar(req: Request, res: Response): Promise<Response> {
    try {
      const user: IUser = req.user!;
      const file = req.file;

      if (!file) {
        const error = new Error("No se ha subido ninguna imagen");
        return res.status(400).json({ error: error.message });
      }

      user.avatar = file.filename;
      await user.save();

      return res.status(200).json({ message: "Avatar actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
