import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const testSendNotification = z.object({
  fcm: z.string().nonempty()
})

export type TestSendNotificationSchema = z.infer<typeof testSendNotification>

export const { schemas: notificationSchema, $ref } = buildJsonSchemas(
  {
    testSendNotification
  },
  { $id: 'notificationSchema' }
)
