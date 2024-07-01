import { FastifyInstance } from 'fastify'
import { getCartOwner, updateCartHandler } from './cart.controller'
import { $ref, cartSchemas } from './cart.schema'

async function cartRoutes(server: FastifyInstance) {
  server.put(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['admin', 'superAdmin', 'user'])],
      schema: {
        body: $ref('updateCartSchema')
      }
    },
    updateCartHandler
  )

  server.get(
    '/owner',
    {
      preHandler: [server.authenticate, server.role.is(['admin', 'superAdmin', 'user'])]
    },
    getCartOwner
  )

  for (const schema of cartSchemas) {
    server.addSchema(schema)
  }
}

export default cartRoutes
