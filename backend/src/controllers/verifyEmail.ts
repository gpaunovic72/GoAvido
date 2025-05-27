import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.params;
  const confirmationToken = await prisma.user.findFirst({
    where: {
      confirmationToken: token,
    },
  });
  if (!confirmationToken) {
    res.status(404).json({
      success: false,
      message: "Token not found",
    });
    return;
  }

  if (
    confirmationToken.confirmationTokenExpiresAt &&
    confirmationToken.confirmationTokenExpiresAt < new Date()
  ) {
    res.status(400).json({
      success: false,
      message: "Token expired",
    });
    return;
  }

  await prisma.user.update({
    where: {
      id: confirmationToken.id,
    },
    data: {
      isVerified: true,
      confirmationToken: null,
      confirmationTokenExpiresAt: null,
    },
  });

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
};
