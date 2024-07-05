import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { taskRoutes } from './routes/tasks';
import { userRoutes } from './routes/users';
import { authRoutes } from './routes/auth';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(fastifyJwt, {
    secret: 'wevy-fake-token',
  });

  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(taskRoutes);

  try {
    await fastify.listen({
      port: 3333,
      host: '0.0.0.0'
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
