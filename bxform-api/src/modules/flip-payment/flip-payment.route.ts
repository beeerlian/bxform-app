import { FastifyInstance } from 'fastify'

import {
  callbackWebHookHandler,
  createBillHandler,
  getAllBillsHandler,
  getBalanceHandler,
  getBankInfoHandler,
  getBillHandler,
  getIsMaintenanceHandler
} from 'modules/flip-payment/controller'
import { $ref, flipPaymentSchema } from './flip-payment.schema'

async function flipPaymentRoutes(server: FastifyInstance) {
  // ** Public Routes **
  server.get(
    '/bill',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        params: $ref('getAllBillsQueryParamSchema')
      }
    },
    getAllBillsHandler
  )

  server.get(
    '/bill/:id',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        params: $ref('getBillParamSchema')
      }
    },
    getBillHandler
  )

  server.post(
    '/create',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        params: $ref('createBillQueryInputSchema')
      }
    },
    createBillHandler
  )

  server.get(
    '/banks',
    {
      preHandler: [server.authenticate, server.role.is(['user'])]
    },
    getBankInfoHandler
  )
  server.get(
    '/is-maintenance',
    {
      preHandler: [server.authenticate, server.role.is(['user'])]
    },
    getIsMaintenanceHandler
  )
  server.get(
    '/balance',
    {
      preHandler: [server.authenticate, server.role.is(['user'])]
    },
    getBalanceHandler
  )
  server.post('/accept-payment-callback', callbackWebHookHandler)

  for (const schema of flipPaymentSchema) {
    server.addSchema(schema)
  }
}

export default flipPaymentRoutes
