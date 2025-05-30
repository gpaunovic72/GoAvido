import express from "express";
import { login, signup } from "../controllers/authCtrl";
import { verifyEmail } from "../controllers/verifyEmail";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);

export default router;
