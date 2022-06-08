import { Router } from "express";

import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
import userRouter from "./userRouter.js";
import { validateToken } from "./../middlewares/tokenMiddleware.js"

const mainRouter = Router();

mainRouter.use(authRouter);

mainRouter.use(validateToken)
mainRouter.use(urlRouter);
mainRouter.use(userRouter);

export default mainRouter;