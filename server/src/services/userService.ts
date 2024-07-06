// src/services/userService.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { UserParams } from '../@types/common';

export async function getAllUsers(request: FastifyRequest, response: FastifyReply) {
  try {
    const allUsers = await prisma.user.findMany();
    response.send(allUsers);
  } catch (error) {
    console.error('GetAll users error:', error);
    response.status(400).send({ error: 'An error occurred while fetching users' });
  }
}

export async function createUser(request: FastifyRequest, response: FastifyReply) {
  try {
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
}

export async function updateUser(request: FastifyRequest<{ Params: UserParams }>, response: FastifyReply) {
  try {
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
}

export async function deleteUser(request: FastifyRequest<{ Params: UserParams }>, response: FastifyReply) {
  try {
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
  } catch (error) {
    console.error('Error deleting user:', error);
    return response.status(400).send({ error: 'Error deleting user.' });
  }
}

export async function getUserById(request: FastifyRequest<{ Params: UserParams }>, response: FastifyReply) {
  try {
    const { user_id } = request.params;

    const user = await prisma.user.findUnique({
      where: {
        user_id
      }
    });

    if (!user) {
      return response.status(404).send({ error: 'User Not Found.' });
    }
    return response.send(user);
  } catch (error) {
    console.error('Error finding user:', error);
    return response.status(400).send({ error: 'Error finding user.' });
  }
}
