import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

const allowedOrigins = String(env.clientUrl || "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "15mb" }));

app.get("/api/health", (_req, res) =>
  res.json({ success: true, message: "Server is running." }),
);
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
