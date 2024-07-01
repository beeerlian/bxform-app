import { FastifyInstance } from 'fastify'
import {
  acceptPickup,
  createOrderHandler,
  getOrderHandler,
  getOrderMeHandler,
  getOrdersHandler
} from './order.controller'
import { $ref, orderSchemas } from './order.schema'

async function orderRoutes(server: FastifyInstance) {
  // ** User Routes **
  server.get(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin', 'user'])],
      schema: {
        querystring: $ref('getOrderMe')
      }
    },
    getOrderMeHandler
  )

  server.get(
    '/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin', 'user'])],
      schema: {
        params: $ref('getParamOrderSchema')
      }
    },
    getOrderHandler
  )

  server.post(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin', 'user'])],
      schema: {
        body: $ref('createBodyOrderSchema')
      }
    },
    createOrderHandler
  )

  // ** Admin Routes **

  server.post(
    '/admin/accept-pickup/:id',
    {
      preHandler: [server.authenticate, server.role.is(['admin', 'superAdmin'])],
      schema: {
        params: $ref('idParamSchema'),
        body: $ref('acceptPickupSchema')
      }
    },
    acceptPickup
  )

  server.get(
    '/admin',
    {
      preHandler: [server.authenticate, server.role.is(['admin', 'superAdmin'])],
      schema: {
        params: $ref('getOrdersQueryParamSchema')
      }
    },
    getOrdersHandler
  )

  for (const schema of orderSchemas) {
    server.addSchema(schema)
  }
}

export default orderRoutes
