import express from "express";
import "dotenv/config.js";
import cors from "cors";

import { router } from "./routes";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    preflightContinue: true,
  }),
);
app.use(express.json());

app.use("/api", router);
