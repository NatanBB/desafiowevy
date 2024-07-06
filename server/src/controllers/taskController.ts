// src/controllers/taskController.ts
import { FastifyInstance } from "fastify";
import { getAllTasks, getUserTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { TaskParams, UserParams } from "../@types/common";

export async function taskController(fastify: FastifyInstance) {
  fastify.get('/tasks', { onRequest: [fastify.authenticate] }, getAllTasks);
  fastify.get<{ Params: UserParams }>('/tasks/:user_id', { onRequest: [fastify.authenticate] }, getUserTasks);
  fastify.post('/tasks', { onRequest: [fastify.authenticate] }, createTask);
  fastify.put<{ Params: TaskParams }>('/tasks', { onRequest: [fastify.authenticate] }, updateTask);
  fastify.delete<{ Params: TaskParams }>('/tasks/:task_id', { onRequest: [fastify.authenticate] }, deleteTask);
}
