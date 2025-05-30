import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createSession = (req: Request, res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });
  res.cookie(process.env.SESSION_COOKIE_NAME || "", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.SESSION_EXPIRES_IN || "86400000"), // 24h en millisecondes
    path: "/",
  });
  return token;
};
