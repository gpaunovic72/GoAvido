import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const uploadPicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reqFile = req.file;
    if (!reqFile) {
      res.status(400).json({ message: "Image is required" });
      return;
    }
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: "",
        type: "PICTURE",
        mediaUrl: `http://localhost:3001/uploads/${reqFile.filename}`,
        authorId: req.userId as string,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Picture uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPictures = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pictures = await prisma.post.findMany({
      where: {
        authorId: req.userId as string,
        type: "PICTURE",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      pictures: pictures.map((picture) => ({
        id: picture.id,
        mediaUrl: picture.mediaUrl,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const picture = await prisma.post.findUnique({
      where: {
        id,
        authorId: req.userId as string,
        type: "PICTURE",
      },
    });
    if (!picture) {
      res.status(404).json({ message: "Picture not found" });
      return;
    }
    await prisma.post.deleteMany({
      where: {
        id,
        authorId: req.userId as string,
        type: "PICTURE",
      },
    });
    res.status(200).json({ message: "Picture deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
