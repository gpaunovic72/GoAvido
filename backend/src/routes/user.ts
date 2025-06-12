import express from "express";
import { getUserProfile } from "../controllers/userCtrl";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.get("/me", requireAuth, getUserProfile);

export default router;
