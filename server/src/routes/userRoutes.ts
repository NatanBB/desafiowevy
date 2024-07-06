// src/routes/userRoutes.ts
import { FastifyInstance } from "fastify";
import { userController } from '../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
  await userController(fastify);
}
