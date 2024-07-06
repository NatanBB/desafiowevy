// src/controllers/userController.ts
import { FastifyInstance } from "fastify";
import { getAllUsers, createUser, updateUser, deleteUser, getUserById } from '../services/userService';
import { UserParams } from "../@types/common";

export async function userController(fastify: FastifyInstance) {
  fastify.get('/users', { onRequest: [fastify.authenticate] }, getAllUsers);
  fastify.post('/users', { onRequest: [fastify.authenticate] }, createUser);
  fastify.put<{ Params: UserParams }>('/users/:user_id', { onRequest: [fastify.authenticate] }, updateUser);
  fastify.delete<{ Params: UserParams }>('/users/:user_id', { onRequest: [fastify.authenticate] }, deleteUser);
  fastify.get<{ Params: UserParams }>('/users/:user_id', { onRequest: [fastify.authenticate] }, getUserById);
}
