import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { router } from "./routes";
import { handleAsyncErrors } from "./middlewares/errors.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use(handleAsyncErrors);

export { app };
