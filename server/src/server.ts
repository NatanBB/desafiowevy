import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { authenticate } from './middlewares/authenticated';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { taskRoutes } from './routes/taskRoutes';

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

  fastify.decorate("authenticate", authenticate);

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
