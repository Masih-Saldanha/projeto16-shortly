import { Router } from "express";

import authRouter from "./authRouter.js";
import urlRouter from "./urlRouter.js";
import userRouter from "./userRouter.js";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(urlRouter);
mainRouter.use(userRouter);

export default mainRouter;