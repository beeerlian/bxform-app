import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import Transaction from 'modules/transaction/transaction.model'
import { transactionStatus } from 'modules/transaction/transaction.types'
import ApiResponse from 'utils/api-response'

export const getPendingTrxHandler = async (request: FastifyRequest) => {
  const userTrx = await Transaction.find({
    user: request.user.id,
    status: transactionStatus.PENDING
  })

  return new ApiResponse(httpStatus.OK, 'deleteTransactionHandler', userTrx)
}
