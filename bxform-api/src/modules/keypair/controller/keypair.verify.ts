import crypto from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { VerifySchema } from 'keypair/keypair.schema'

const keypairVerifyHandler = async (request: FastifyRequest<{ Body: VerifySchema }>, reply: FastifyReply) => {
  const { signature, publicKey, data } = request.body

  const newPublicKey = crypto.createPublicKey({
    key: Buffer.from(publicKey, 'base64'),
    format: 'der',
    type: 'spki'
  })

  const verify = crypto.createVerify('SHA256')
  verify.update(data)
  verify.end()

  const result = verify.verify(newPublicKey, signature, 'base64')

  return reply.send({ result })
}

export { keypairVerifyHandler }
