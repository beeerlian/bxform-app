import { FastifyInstance } from 'fastify'
import { keypairGenerateHandler } from 'keypair/controller/keypair.generate'
import { keypairSiginHandler } from 'keypair/controller/keypair.sigin'
import { keypairVerifyHandler } from 'keypair/controller/keypair.verify'
import { $ref, keypairSchemas } from 'keypair/keypair.schema'

async function keypairRoutes(server: FastifyInstance) {
  server.post('/generate', {}, keypairGenerateHandler)
  server.post('/sigin', { schema: $ref('siginSchema') }, keypairSiginHandler)
  server.post('/verify', { schema: $ref('verifySchema') }, keypairVerifyHandler)

  for (const schema of keypairSchemas) {
    server.addSchema(schema)
  }
}

export default keypairRoutes
