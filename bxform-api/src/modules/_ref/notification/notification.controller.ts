import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import { TestSendNotificationSchema } from 'notification/notification.schema'
import { testSendNotification } from 'notification/notification.service'
import ApiResponse from 'utils/api-response'

const testSendNotificationHandler = async (
  req: FastifyRequest<{
    Body: TestSendNotificationSchema
  }>
) => {
  const { fcm } = req.body

  const result = await testSendNotification(fcm)

  if (!result) {
    return new ApiResponse(httpStatus.BAD_REQUEST, 'testSendNotificationHandler failed', result)
  }

  return new ApiResponse(httpStatus.OK, 'testSendNotificationHandler successfully', result)
}

export { testSendNotificationHandler }
