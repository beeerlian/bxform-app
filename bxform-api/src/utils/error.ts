import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

const handleErrorFasitify = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  reply.send({
    code: error.code,
    status: error.statusCode,
    message: error.message
  })
}

export { handleErrorFasitify }
