import '@fastify/jwt';
import 'fastify';
import { FastifyJwt } from 'fastify-jwt';

declare module '@fastify/jwt' {
  interface FastifyRequest {
    jwtVerify: FastifyJwt['verify'];
  }
  interface FastifyJWT {
    user: {
      user_id: string;
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}