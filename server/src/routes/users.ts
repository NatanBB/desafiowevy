import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { z } from 'zod';
import { authenticade } from "../plugins/authenticated";
import { UserParams } from "../@types/common";

export async function userRoutes(fastify: FastifyInstance) {

  fastify.get('/users', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const allTaks = await prisma.user.findMany()
      response.send(allTaks);
    } catch (error) {
      console.error('GetAll users error:', error);
      response.status(400).send({ error: 'An error occurred while fetching users' });
    }
  });

  fastify.post('/users', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const createUserBody = z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
        avatarUrl: z.string().nullable()
      });

      const { name, username, password, avatarUrl } = createUserBody.parse(request.body);

      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          password,
          avatarUrl
        },
      });

      return response.status(201).send(newUser);
    } catch (error) {
      console.error('Create user error:', error);
      return response.status(400).send({ error: 'An error occurred while creating the user.' });
    }
  });

  fastify.put<{ Params: UserParams }>('/users/:user_id', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const updateUserSchema = z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
        avatarUrl: z.string().nullable(),
        user_id: z.string()
      });

      const { user_id } = request.params;

      const {
        name,
        username,
        password,
        avatarUrl,
      } = updateUserSchema.parse(request.body);

      const existingUser = await prisma.user.findUnique({
        where: {
          user_id,
        },
      });

      if (!existingUser) {
        return response.status(404).send({ error: 'User Not Found' });
      }

      const updatedUser = await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          name,
          username,
          password,
          avatarUrl,
          user_id
        },
      });

      return response.send(updatedUser);
    } catch (error) {
      console.error('Updating user error:', error);
      return response.status(400).send({ error: 'Updating user error.' });
    }
  });

  fastify.delete<{ Params: UserParams }>('/users/:user_id', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const { user_id } = request.params;

      const existingUser = await prisma.user.findUnique({
        where: {
          user_id,
        },
      });

      if (!existingUser) {
        return response.status(404).send({ error: 'User Not Found.' });
      }

      await prisma.user.delete({
        where: {
          user_id,
        },
      });

      return response.send({ deleted: true });
    }
    catch (error) {
      console.error('Error deleting user:', error);
      return response.status(400).send({ error: 'Error deleting user.' });
    }
  });

  fastify.get<{ Params: UserParams }>('/users/:user_id', {
    onRequest: [authenticade]
  }, async (request, response) => {
    try {
      await request.jwtVerify();

      const { user_id } = request.params;

      const user = await prisma.user.findUnique({
        where: {
          user_id
        }
      })

      if (!user) {
        return response.status(404).send({ error: 'User Not Found.' });
      }
      return response.send(user);
    }
    catch (error) {
      console.error('Error find user:', error);
      return response.status(400).send({ error: 'Error deleting user.' });
    }
  })
}