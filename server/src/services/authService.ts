// src/services/userService.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

/**
 * Login User if Valid
 * @param request 
 * @param response 
 * @returns 
 */
export async function login(request: FastifyRequest, response: FastifyReply) {
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
      return response.status(401).send({ error: 'Invalid credentials' });
    }

    const token = request.server.jwt.sign({ user_id: user.user_id });
    return response.send({ token });
  } catch (error) {
    console.error('Login error:', error);
    return response.status(500).send({ error: 'Internal Server Error.' });
  }
}

export async function getUserInfo(request: FastifyRequest, response: FastifyReply) {
  try {
    const { user } = request;

    const userInfo = await prisma.user.findUnique({
      where: {
        user_id: user.user_id,
      },
    });

    response.send(userInfo);
  } catch (error) {
    request.server.log.error('Error fetching user information:', error);
    response.status(500).send({ error: 'Error fetching user information' });
  }
}
