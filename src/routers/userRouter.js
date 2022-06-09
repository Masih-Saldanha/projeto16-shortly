import { Router } from "express";

import { getUserData, getUsersRanking } from "../controllers/userController.js";
import { validateUserData, validateUsersRanking } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.get("/users/:id", validateUserData, getUserData);
userRouter.get("/users/ranking", validateUsersRanking, getUsersRanking);

export default userRouter;