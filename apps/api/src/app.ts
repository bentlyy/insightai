import express from "express";
import cors from "cors";
import { env } from "./config/env.js";

import authRoutes from "./modules/auth/auth.routes.js";
import datasetRoutes from "./modules/datasets/dataset.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/datasets", datasetRoutes);

app.get("/", (_, res) => {
  res.json({ message: "InsightAI API is running ✅" });
});

export default app;
