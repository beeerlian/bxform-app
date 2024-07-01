import { FastifyInstance } from 'fastify'
import { getPendingTrxHandler } from 'modules/transaction/controllers/trx.getpendig'
import { getOwnerTransactionsHandler } from 'modules/transaction/controllers/trx.owner'
import { transactionByOrdersHandler } from 'transaction/controllers/transaction.by-orders'
import { getTransactionHandler, getTransactionsHandler } from './transaction.controller'
import { $ref, transactionSchemas } from './transaction.schema'

async function transactionRoutes(server: FastifyInstance) {
  // ** User
  server.get(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        querystring: $ref('getTransactionsQueryParamSchema')
      }
    },
    getOwnerTransactionsHandler
  )

  server.get(
    '/detail/:id',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        params: $ref('getParamTransactionSchema')
      }
    },
    getTransactionHandler
  )

  server.get(
    '/pending',
    {
      preHandler: [server.authenticate, server.role.is(['user'])]
    },
    getPendingTrxHandler
  )

  server.get(
    '/order/:orderId',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        params: $ref('getTransactionByOrderIdSchema'),
        querystring: $ref('getTransactionsQueryParamSchema')
      }
    },
    transactionByOrdersHandler
  )

  // ** Admin
  server.get(
    '/admin',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('getTransactionsQueryParamSchema')
      }
    },
    getTransactionsHandler
  )

  server.get(
    '/admin/detail/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('getParamTransactionSchema')
      }
    },
    getTransactionHandler
  )

  for (const schema of transactionSchemas) {
    server.addSchema(schema)
  }
}

export default transactionRoutes
