// src/routes/authRoutes.ts
import { FastifyInstance } from "fastify";
import { authController } from "../controllers/authController";

export async function authRoutes(fastify: FastifyInstance) {
  await authController(fastify);
}
