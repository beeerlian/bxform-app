import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { PaginateOptions } from 'mongoose'
import Transaction from 'transaction/transaction.model'
import { GetTransactionByOrderIdSchema, GetTransactionsQueryParam } from 'transaction/transaction.schema'
import { transactionStatus } from 'transaction/transaction.types'
import ApiResponse from 'utils/api-response'

export const transactionByOrdersHandler = async (
  req: FastifyRequest<{
    Params: GetTransactionByOrderIdSchema
    Querystring: GetTransactionsQueryParam
  }>
) => {
  const options: PaginateOptions = _.pick(req.query, ['limit', 'sort', 'page'])

  const trx = await Transaction.paginate(
    {
      status: transactionStatus.PAID,
      'orders.id': req.params.orderId
    },
    {
      ...options,
      populate: [
        {
          path: 'orders'
        }
      ]
    }
  )

  return new ApiResponse(httpStatus.OK, 'success', trx)
}
