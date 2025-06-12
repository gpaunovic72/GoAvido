import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies[process.env.SESSION_COOKIE_NAME || "auth_token"];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      req.userId = (decoded as JwtPayload).userId;
      next();
    }
  );
};
