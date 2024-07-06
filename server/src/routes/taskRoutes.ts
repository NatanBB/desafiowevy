// src/routes/taskRoutes.ts
import { FastifyInstance } from "fastify";
import { taskController } from '../controllers/taskController';

export async function taskRoutes(fastify: FastifyInstance) {
  await taskController(fastify);
}
