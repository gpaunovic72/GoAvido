import bcrypt from "bcrypt";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
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
        name: true,
        pictureUrl: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    let pictureUrl = user.pictureUrl;
    if (pictureUrl && pictureUrl.startsWith("/uploads/")) {
      pictureUrl = `http://localhost:3001${pictureUrl}`;
    }

    res.json({
      ...user,
      pictureUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File deleted: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { pictureUrl: true },
    });

    let pictureUrl = req.body.pictureUrl;

    if (req.file) {
      pictureUrl = `http://localhost:3001/uploads/${req.file.filename}`;

      if (currentUser?.pictureUrl) {
        const oldImagePath = currentUser.pictureUrl.replace(
          "http://localhost:3001",
          ""
        );
        const fullPath = path.join(__dirname, "..", "..", oldImagePath);
        deleteFile(fullPath);
      }
    }

    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (existingUser && existingUser.id !== userId) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
    }

    const updateData: any = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.email) updateData.email = req.body.email;
    if (hashedPassword) updateData.password = hashedPassword;
    if (pictureUrl) updateData.pictureUrl = pictureUrl;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        name: true,
        email: true,
        pictureUrl: true,
      },
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
