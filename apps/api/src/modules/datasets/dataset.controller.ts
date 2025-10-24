import { Request, Response } from "express";
import { datasetService } from "./dataset.service.js";

class DatasetController {
  async upload(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No se subió ningún archivo" });
      }

      const dataset = await datasetService.saveDataset(userId, file);

      return res.status(201).json(dataset);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const datasetController = new DatasetController();
