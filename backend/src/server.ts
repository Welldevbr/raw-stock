import express, { NextFunction, Request, Response } from "express";
import "dotenv/config.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { router } from "./routes";
import { prisma } from "./database/prisma";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", router);

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
