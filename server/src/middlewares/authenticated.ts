// src/middlewares/authenticate.ts
import { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    response.send(err);
  }
}
