import { Router } from "express";

import { urlShortener } from "../controllers/urlController.js";
import { validateUrl } from "../middlewares/urlMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateUrl, urlShortener)

export default urlRouter;