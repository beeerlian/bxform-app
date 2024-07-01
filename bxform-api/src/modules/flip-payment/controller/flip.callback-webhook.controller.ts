import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import { AnySchema } from 'modules/payment/payment.schema'
import { transactionStatus } from 'transaction/transaction.types'
import { handleUpdateTransaction } from 'transaction/utils/transaction.update'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

async function callbackWebHookHandler(
  request: FastifyRequest<{
    Body: AnySchema
    Params: AnySchema
  }>
) {
  try {
    const data = request.body
    if (!data) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'data not found')
    }

    let status = transactionStatus.PENDING

    switch (data.status) {
      case 'SUCCESSFUL':
        status = transactionStatus.PAID
        break
      case 'CANCELLED':
        status = transactionStatus.CANCELLED
        break
      case 'FAILED':
        status = transactionStatus.FAILED
        break
      default:
        status = transactionStatus.PENDING
        break
    }

    if (!data.amount || data.amount == 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Pembayaran tidak valid')
    }

    await handleUpdateTransaction({
      transactionId: data.title,
      nominal: data.amount,
      payment: data,
      status
    })

    return new ApiResponse(httpStatus.OK, 'Accept payment success')
  } catch (error) {
    return new ApiResponse(httpStatus.INTERNAL_SERVER_ERROR, 'Accept payment failed')
  }
}

export { callbackWebHookHandler }
