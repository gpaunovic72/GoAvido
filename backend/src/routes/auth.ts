import express from "express";
import { signup } from "../controllers/authCtrl";
import { verifyEmail } from "../controllers/verifyEmail";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);

export default router;
