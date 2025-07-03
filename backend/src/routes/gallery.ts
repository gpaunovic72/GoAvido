import express from "express";
import {
  deletePicture,
  getPictures,
  uploadPicture,
} from "../controllers/uploadPicture";
import { requireAuth } from "../middleware/requireAuth";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/upload", requireAuth, upload.single("image"), uploadPicture);
router.get("/capture", requireAuth, getPictures);
router.delete("/:id", requireAuth, deletePicture);

export default router;
