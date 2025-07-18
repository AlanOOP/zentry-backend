import { Router, Request, Response } from "express";
import { UserController } from "./controllers/userController";

const router = Router();

router.post("/auth/register", UserController.register);

export default router;
