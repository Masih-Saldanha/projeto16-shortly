import { Router } from "express";

import { getUrlById, redirectToUrl, urlShortener } from "../controllers/urlController.js";
import { validateIdOnTable, validateUrl, validateShortUrlOnTable } from "../middlewares/urlMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validateToken, validateUrl, urlShortener)
urlRouter.get("/urls/:id", validateIdOnTable, getUrlById);
urlRouter.get("/urls/open/:shortUrl", validateShortUrlOnTable, redirectToUrl);

export default urlRouter;