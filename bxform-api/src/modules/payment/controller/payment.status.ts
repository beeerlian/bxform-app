import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import { xenditEWalletChargeStatus } from 'modules/_ref/xendit/services/xendit.ewallet-charge.status'
import { GetPaymentStatus } from 'payment/payment.schema'
import { transactionStatus } from 'transaction/transaction.types'
import { handleUpdateTransaction } from 'transaction/utils/transaction.update'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

export const getPaymentStatusHandler = async (
  request: FastifyRequest<{
    Body: GetPaymentStatus
  }>
) => {
  const body = request.body

  // ** Check xendit ewallet charge status
  let nominal = 0
  let payment: any
  let status: any

  if (body.provider === 'xendit') {
    if (body.method.includes('ewallet')) {
      payment = await xenditEWalletChargeStatus({
        chargeId: body.refId
      })

      switch (payment.status) {
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

      nominal = payment.metadata.nominal
    }
  }

  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pembayaran tidak ditemukan')
  }

  if (!nominal || nominal == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pembayaran tidak valid')
  }

  const newTransaction = await handleUpdateTransaction({
    transactionId: payment.reference_id,
    nominal: nominal,
    status,
    payment
  })

  return new ApiResponse(httpStatus.OK, 'Pembayaran berhasil ditemukan', newTransaction)
}
