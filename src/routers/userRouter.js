import { Router } from "express";

import { getUserData, getUsersRanking } from "../controllers/userController.js";
import { validateUserData, validateUsersRanking } from "../middlewares/userMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js"

const userRouter = Router();

userRouter.get("/users/:id", validateToken, validateUserData, getUserData);
userRouter.get("/ranking", validateUsersRanking, getUsersRanking);

export default userRouter;