import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import { AnySchema } from 'modules/payment/payment.schema'
import { transactionStatus } from 'transaction/transaction.types'
import { handleUpdateTransaction } from 'transaction/utils/transaction.update'
import ApiError from 'utils/api-error'

async function xenditEWalletStatus(
  request: FastifyRequest<{
    Body: AnySchema
  }>
) {
  const { data } = request.body

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'data not found')
  }

  // ** Check xendit ewallet charge status
  let status = transactionStatus.PENDING

  switch (data.status) {
    case 'SUCCEEDED':
      status = transactionStatus.PAID
      break
    case 'PENDING':
      status = transactionStatus.PENDING
      break
    case 'FAILED':
      status = transactionStatus.FAILED
      break
    default:
      status = transactionStatus.PENDING
      break
  }

  if (!data.metadata.nominal || data.metadata.nominal == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pembayaran tidak valid')
  }

  const newTrx = await handleUpdateTransaction({
    transactionId: data.reference_id,
    nominal: data.metadata.nominal,
    payment: data,
    status
  })

  return newTrx
}

export { xenditEWalletStatus }
