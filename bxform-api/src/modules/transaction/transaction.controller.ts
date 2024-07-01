import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { ITransaction } from 'modules/transaction/transaction.interfaces'
import Transaction from 'modules/transaction/transaction.model'
import { GetTransactionParam, GetTransactionsQueryParam } from 'modules/transaction/transaction.schema'
import { FilterQuery, PaginateOptions } from 'mongoose'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

export async function getTransactionsHandler(
  request: FastifyRequest<{
    Querystring: GetTransactionsQueryParam
  }>
) {
  const query: FilterQuery<ITransaction> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])

  Object.assign(options, {
    populate: [
      {
        path: 'user',
        select: 'profile email nis phone'
      },
      {
        path: 'orders'
      }
    ]
  })

  const res = await Transaction.paginate({ ...query }, options)

  return new ApiResponse(httpStatus.OK, 'getTransactionsHandler', res)
}

export async function getTransactionHandler(
  request: FastifyRequest<{
    Params: GetTransactionParam
  }>
) {
  const params = request.params

  const transaction = await Transaction.findById(params.id).populate([
    {
      path: 'user',
      select: 'profile email nis phone'
    },
    {
      path: 'orders'
    }
  ])

  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found')
  }

  return new ApiResponse(httpStatus.OK, 'getTransactionHandler', transaction)
}
