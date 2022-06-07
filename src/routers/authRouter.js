import { Router } from "express";

import { signUp, signIn } from "../controllers/authController.js";
import { validateSignUp } from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSignUp, signUp);
authRouter.post("/signup", signIn);

export default authRouter;