import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createSession = (req: Request, res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });
  res.cookie(process.env.SESSION_COOKIE_NAME || "auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: parseInt(process.env.SESSION_EXPIRES_IN || "604800000"),
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.COOKIE_DOMAIN
        : undefined,
  });
  return token;
};
