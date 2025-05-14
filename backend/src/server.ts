import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Normalisation du port
const normalizePort = (val: string): number | string | false => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || "3001");

// Configuration de l'application
app.use(cors());
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API de Goavido" });
});

// Création du serveur HTTP
const server = http.createServer(app);

// Gestion des erreurs
const errorHandler = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? `pipe ${address}` : `port: ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Gestion des événements du serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  console.log(`Server is running on ${bind}`);
});

// Démarrage du serveur
server.listen(port);
