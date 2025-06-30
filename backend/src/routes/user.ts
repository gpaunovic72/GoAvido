import express from "express";
import { getUserProfile, updateProfile } from "../controllers/userCtrl";
import { requireAuth } from "../middleware/requireAuth";
import upload from "../middleware/upload";
const router = express.Router();

router.get("/me", requireAuth, getUserProfile);
router.put("/profile", requireAuth, upload.single("image"), updateProfile);

export default router;
