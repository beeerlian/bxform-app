import { FastifyInstance } from 'fastify'
import { testSendNotificationHandler } from 'notification/notification.controller'
import { $ref, notificationSchema } from 'notification/notification.schema'

async function notificationsRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin'])],
      schema: {
        body: $ref('testSendNotification')
      }
    },
    testSendNotificationHandler
  )

  for (const schema of notificationSchema) {
    server.addSchema(schema)
  }
}

export default notificationsRoutes
