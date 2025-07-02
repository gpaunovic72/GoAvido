import express from "express";
import { uploadPicture } from "../controllers/uploadPicture";
import { requireAuth } from "../middleware/requireAuth";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/upload", requireAuth, upload.single("image"), uploadPicture);

export default router;
