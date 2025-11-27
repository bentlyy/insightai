// src/modules/datasets/dataset.controller.ts
import { NextFunction, Response } from "express";
import { AuthRequest } from "../../middlewares/isAuth.js";
import { DatasetService } from "./dataset.service.js";

export class DatasetController {
  static async upload(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const file = (req as any).file as Express.Multer.File | undefined;

      if (!file) {
        res.status(400).json({ message: "Archivo requerido (campo 'file')" });
        return;
      }

      const dataset = await DatasetService.createFromUpload({
        userId: req.userId,
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        storagePath: file.path, // ruta donde multer lo guardó
      });

      res.status(201).json(dataset);
    } catch (error) {
      next(error);
    }
  }

  static async listMine(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const datasets = await DatasetService.listByUser(req.userId);
      res.json(datasets);
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const { id } = req.params;
      const dataset = await DatasetService.getByIdForUser(id, req.userId);

      if (!dataset) {
        res.status(404).json({ message: "Dataset no encontrado" });
        return;
      }

      res.json(dataset);
    } catch (error) {
      next(error);
    }
  }

  static async analyze(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "No autorizado" });
        return;
      }

      const { id } = req.params;

      const result = await DatasetService.analyzeDatasetForUser({
        datasetId: id,
        userId: req.userId,
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
