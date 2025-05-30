import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createSession } from "../lib/session";

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        confirmationToken: token,
        confirmationTokenExpiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        confirmationToken: null,
        confirmationTokenExpiresAt: null,
      },
    });

    // Créer la session après vérification réussie
    createSession(req, res, user.id);

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while verifying email",
    });
  }
};
