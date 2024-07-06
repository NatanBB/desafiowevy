// src/services/userService.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  try {
    const loginSchema = z.object({
      username: z.string(),
      password: z.string()
    });

    const { username, password } = loginSchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: {
        username,
        password
      }
    });

    if (!user || user.password !== password) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = request.server.jwt.sign({ user_id: user.user_id });
    return reply.send({ token });
  } catch (error) {
    console.error('Login error:', error);
    return reply.status(500).send({ error: 'Internal Server Error.' });
  }
}

export async function getUserInfo(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { user } = request;

    const userInfo = await prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
    });

    reply.send(userInfo);
  } catch (error) {
    request.server.log.error('Error fetching user information:', error);
    reply.status(500).send({ error: 'Error fetching user information' });
  }
}
