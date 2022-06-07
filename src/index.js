import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import mainRouter from "./routers/mainRouter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(mainRouter)

app.listen(process.env.PORT || 4000, () => {
    console.log(`API listening on port: ${process.env.PORT}`)
});