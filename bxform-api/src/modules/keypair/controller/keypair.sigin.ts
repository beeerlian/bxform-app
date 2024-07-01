import crypto from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'

import { SiginSchema } from 'keypair/keypair.schema'

const keypairSiginHandler = async (request: FastifyRequest<{ Body: SiginSchema }>, reply: FastifyReply) => {
  const { privateKey, data } = request.body

  const newPrivateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKey, 'base64'),
    format: 'der',
    type: 'pkcs8'
  })

  const sign = crypto.createSign('RSA-SHA256')
  sign.update(data)
  sign.end()

  const signature = sign.sign(newPrivateKey, 'base64')

  reply.send({
    signature,
    data
  })
}

export { keypairSiginHandler }
