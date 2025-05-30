import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { createSession } from "../lib/session";
import { sendVerificationEmail } from "../utils/email";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = crypto.randomBytes(32).toString("hex");
    const confirmationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        confirmationToken,
        confirmationTokenExpiresAt,
        isVerified: false,
      },
    });

    try {
      await sendVerificationEmail(email, name, confirmationToken);
      res.json({
        success: true,
        message:
          "Registration successful. Please check your email for verification.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      await prisma.user.delete({
        where: { id: user.id },
      });
      res.status(500).json({
        success: false,
        message: "Failed to send verification email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while signing up",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    createSession(req, res, user.id);
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};
