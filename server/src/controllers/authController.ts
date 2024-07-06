// src/controllers/authController.ts
import { FastifyInstance } from "fastify";
import { login, getUserInfo } from '../services/authService';

export async function authController(fastify: FastifyInstance) {
  fastify.post('/login', login);
  fastify.get('/user', { onRequest: [fastify.authenticate] }, getUserInfo);
}
