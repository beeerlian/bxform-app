import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import { AnySchema } from 'modules/payment/payment.schema'
import ApiError from 'utils/api-error'

async function xenditEWalletNotification(
  request: FastifyRequest<{
    Body: AnySchema
  }>
) {
  const { data } = request.body

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'data not found')
  }

  return 'ok'
}

export { xenditEWalletNotification }
