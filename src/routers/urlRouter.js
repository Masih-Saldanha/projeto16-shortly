import { Router } from "express";

import { getUrlById, urlShortener } from "../controllers/urlController.js";
import { validateIdOnTable, validateUrl } from "../middlewares/urlMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, validateUrl, urlShortener)
urlRouter.get("/urls/:id", validateIdOnTable, getUrlById);

export default urlRouter;