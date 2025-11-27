// src/services/ml.service.ts
import axios from "axios";
import { env } from "../config/env.js";

const ML_BASE_URL = env.ML_BASE_URL ?? "http://localhost:8000";

export interface MlAnalysisResponse {
  // Por ahora dejamos esto genérico, luego lo tipamos mejor
  [key: string]: any;
}

export async function requestBasicAnalysis(
  storagePath: string
): Promise<MlAnalysisResponse> {
  // Aquí asumimos que el servicio ML expone POST /analyze
  const res = await axios.post(`${ML_BASE_URL}/analyze`, {
    path: storagePath,
  });

  return res.data;
}
