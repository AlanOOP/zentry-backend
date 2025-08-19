import { Router, Request, Response } from "express";
import { body } from "express-validator";
import { UserController } from "./controllers/userController";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";
import { upload } from "./lib/multer";

const router = Router();

router.post(
    "/auth/register",
    body("handle").notEmpty().withMessage("El handle es obligatorio"),
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
    handleInputErrors,
    UserController.register
);

router.post(
    "/auth/login",
    body("email").isEmail().withMessage("El email no es válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    UserController.login
);

router.get(
    "/auth/profile", authenticate,
    UserController.getUserProfile
);

// modificar handle y description
router.put(
    "/auth/profile",
    authenticate,
    body("handle").notEmpty().withMessage("El handle es obligatorio"),
    body("description").notEmpty().withMessage("La descripción es obligatoria"),
    handleInputErrors,
    authenticate,
    UserController.updateUserProfile
);

router.patch(
    "/auth/profile/image",
    authenticate,
    upload.single("image"),
    UserController.updateUserAvatar
);

export default router;
