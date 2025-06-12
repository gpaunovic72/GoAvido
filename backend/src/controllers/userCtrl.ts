import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        pictureUrl: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      pictureUrl: user.pictureUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
