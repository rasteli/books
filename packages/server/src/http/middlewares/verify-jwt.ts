import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    console.log(request.user)
  } catch (err) {
    return reply.status(401).send()
  }
}
