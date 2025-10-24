import { Router } from "express";
import multer from "multer";
import { datasetController } from "./dataset.controller.js";
import { isAuth } from "../../middlewares/isAuth.js";

const router = Router();

// Config Multer
const upload = multer({ dest: "uploads/" });

router.post("/upload", isAuth, upload.single("file"), (req, res) =>
  datasetController.upload(req, res)
);

export default router;
