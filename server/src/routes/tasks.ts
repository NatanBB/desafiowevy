import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from 'zod';
import { authenticade } from "../plugins/authenticated";
import { TaskParams, UserParams } from "../@types/common";

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get('/tasks', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const allTaks = await prisma.task.findMany()
      response.send(allTaks);
    } catch (error) {
      console.error('GetAll tasks error:', error);
      response.status(400).send({ error: 'An error occurred while fetching tasks' });
    }
  });

  fastify.get<{ Params: UserParams }>('/tasks/:user_id', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const { user_id } = request.params;

      const tasks = await prisma.task.findMany({
        where: {
          user_id,
        },
      });

      response.send(tasks);
    } catch (error) {
      fastify.log.error('Error fetching tasks:', error);
      response.status(400).send({ error: 'An error occurred while fetching tasks' });
    }
  });

  fastify.post('/tasks', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const createTaskBody = z.object({
        title: z.string(),
        description: z.string(),
        user_id: z.string(),
        createdAt: z.string()
      });

      const { title, description, user_id, createdAt } = createTaskBody.parse(request.body);

      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          user_id,
          createdAt: new Date(createdAt) ?? new Date()
        },
      });

      return response.status(201).send(newTask);
    } catch (error) {
      console.error('Create task error:', error);
      return response.status(400).send({ error: 'An error occurred while creating the task.' });
    }
  });

  fastify.put<{ Params: TaskParams }>('/tasks', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const updateTaskSchema = z.object({
        title: z.string(),
        description: z.string(),
        task_id: z.string(),
        completedOn: z.string().nullable(),
        createdAt: z.string(),
        user_id: z.string()
      });

      const {
        title,
        description,
        completedOn,
        createdAt,
        task_id,
        user_id
      } = updateTaskSchema.parse(request.body);

      const existingTask = await prisma.task.findUnique({
        where: {
          task_id,
        },
      });

      if (!existingTask) {
        return response.status(404).send({ error: 'Task Not Found' });
      }

      const updatedTask = await prisma.task.update({
        where: {
          task_id,
        },
        data: {
          title,
          description,
          completedOn: completedOn ? new Date(completedOn) : null,
          createdAt: new Date(createdAt),
          task_id,
          user_id
        },
      });

      return response.send(updatedTask);
    } catch (error) {
      console.error('Updating task error:', error);
      return response.status(400).send({ error: 'Updating task error.' });
    }
  });

  fastify.delete<{ Params: TaskParams }>('/tasks/:task_id', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const { task_id } = request.params;

      const existingTask = await prisma.task.findUnique({
        where: {
          task_id,
        },
      });

      if (!existingTask) {
        return response.status(404).send({ error: 'Task Not Found.' });
      }

      await prisma.task.delete({
        where: {
          task_id,
        },
      });

      return response.send({ deleted: true });
    } catch (error) {
      console.error('Error deleting task:', error);
      return response.status(400).send({ error: 'Error deleting task.' });
    }
  });
}