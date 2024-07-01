import { FastifyInstance } from 'fastify'
import { $ref, paymentSchemas } from 'modules/payment/payment.schema'
import { createPaymentHandler } from 'payment/controller/payment.create'
import { getPaymentMethodsHandler } from 'payment/controller/payment.methods'
import { getPaymentStatusHandler } from 'payment/controller/payment.status'
import { xenditEWalletNotification } from 'payment/controller/xendit.ewallet.notification'
import { xenditEWalletStatus } from 'payment/controller/xendit.ewallet.status'

async function paymentRoutes(server: FastifyInstance) {
  // ** Public Routes
  server.post(
    '/xendit/ewallet/notification',
    {
      schema: {
        body: $ref('anySchema')
      }
    },
    xenditEWalletNotification
  )

  server.post(
    '/xendit/ewallet/status',
    {
      schema: {
        body: $ref('anySchema')
      }
    },
    xenditEWalletStatus
  )

  // ** User Routes
  server.post(
    '/create',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        body: $ref('createPaymentSchema')
      }
    },
    createPaymentHandler
  )

  server.post(
    '/payment-methods',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        body: $ref('getPaymentMethods')
      }
    },
    getPaymentMethodsHandler
  )

  server.post(
    '/status',
    {
      preHandler: [server.authenticate, server.role.is(['user'])],
      schema: {
        body: $ref('getPaymentStatus')
      }
    },
    getPaymentStatusHandler
  )

  for (const schema of paymentSchemas) {
    server.addSchema(schema)
  }
}

export default paymentRoutes
