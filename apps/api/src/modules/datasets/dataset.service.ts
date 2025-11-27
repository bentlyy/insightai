// src/modules/datasets/dataset.service.ts
import prisma from "../../config/prisma.js";
import { Dataset } from "@prisma/client";
import { requestBasicAnalysis } from "../../services/ml.service.js";

export class DatasetService {
  static async createFromUpload(params: {
    userId: string;
    filename: string;
    mimetype: string;
    size: number;
    storagePath: string;
  }): Promise<Dataset> {
    const { userId, filename, mimetype, size, storagePath } = params;

    // Por ahora schemaJson vacío; luego lo podemos llenar con info del ML/preview del CSV
    const dataset = await prisma.dataset.create({
      data: {
        userId,
        filename,
        mimetype,
        size,
        storagePath,
        schemaJson: {}, // 👈 placeholder
      },
    });

    return dataset;
  }

  static async listByUser(userId: string): Promise<Dataset[]> {
    return prisma.dataset.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getByIdForUser(
    id: string,
    userId: string
  ): Promise<Dataset | null> {
    return prisma.dataset.findFirst({
      where: { id, userId },
    });
  }

  static async analyzeDatasetForUser(params: {
    datasetId: string;
    userId: string;
  }) {
    const { datasetId, userId } = params;

    const dataset = await prisma.dataset.findFirst({
      where: { id: datasetId, userId },
    });

    if (!dataset) {
      throw new Error("Dataset no encontrado o no pertenece al usuario");
    }

    // Llamamos al servicio ML
    const mlResult = await requestBasicAnalysis(dataset.storagePath);

    // Creamos un Analysis asociado
    const analysis = await prisma.analysis.create({
      data: {
        userId,
        datasetId: dataset.id,
        algorithm: "basic_profile",
        status: "completed",
        paramsJson: {}, // luego podemos guardar parámetros
        metricsJson: mlResult, // guardamos la respuesta tal cual en JSON
      },
    });

    return { dataset, analysis };
  }
}
