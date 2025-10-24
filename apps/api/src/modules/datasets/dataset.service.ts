import { prisma } from "../../config/prisma.js";
import fs from "fs/promises";

class DatasetService {
  async saveDataset(userId: string, file: Express.Multer.File) {
    const schemaJson = {}; // Lo llenaremos luego al leer con el ML

    const dataset = await prisma.dataset.create({
      data: {
        userId,
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        storagePath: file.path,
        schemaJson
      }
    });

    return dataset;
  }
}

export const datasetService = new DatasetService();
