import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticade } from "../plugins/authenticated";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', async (request, response) => {
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

      const token = fastify.jwt.sign({ user_id: user.user_id });
      return response.send({ token });
    }
    catch (error) {
      console.error('Login error:', error);
      return response.status(500).send({ error: 'Internal Server Error.' });
    }
  });

  fastify.get('/user', {
    onRequest: [authenticade]
  }, async (request, reply) => {
    try {
      const { user } = request;

      const userInfo = await prisma.user.findUnique({
        where: {
          user_id: user.user_id,
        },
      });

      reply.send(userInfo);
    } catch (error) {
      fastify.log.error('Error fetching user information:', error);
      reply.status(500).send({ error: 'Error fetching user information' });
    }
  });
}
