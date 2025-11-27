// src/modules/datasets/dataset.routes.ts
import { Router } from "express";
import multer from "multer";
import path from "path";
import { isAuth } from "../../middlewares/isAuth.js";
import { DatasetController } from "./dataset.controller.js";
import { ensureUploadDir, UPLOAD_DIR } from "../../utils/file.js";

ensureUploadDir();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

const router = Router();

// POST /datasets/upload  (campo 'file' en form-data)
router.post(
  "/upload",
  isAuth,
  upload.single("file"),
  DatasetController.upload
);

// GET /datasets        → lista datasets del usuario
router.get("/", isAuth, DatasetController.listMine);

// GET /datasets/:id    → detalle de un dataset
router.get("/:id", isAuth, DatasetController.getOne);

// POST /datasets/:id/analyze → pide análisis al servicio ML y crea un Analysis
router.post("/:id/analyze", isAuth, DatasetController.analyze);

export default router;
