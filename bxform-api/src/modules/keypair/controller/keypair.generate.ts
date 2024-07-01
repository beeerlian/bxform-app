import crypto from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AnySchema } from 'keypair/keypair.schema'

const keypairGenerateHandler = async (request: FastifyRequest<{ Body: AnySchema }>, reply: FastifyReply) => {
  let keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'der'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der'
    }
  })

  reply.send({
    publicKey: keyPair.publicKey.toString('base64'),
    privateKey: keyPair.privateKey.toString('base64')
  })
}

export { keypairGenerateHandler }
