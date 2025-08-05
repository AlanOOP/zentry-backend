import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { UserController } from "./controllers/userController";

const router = Router();

router.post(
    "/auth/register",
    body("handle").notEmpty().withMessage("El handle es obligatorio"),
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
    UserController.register
);

export default router;
