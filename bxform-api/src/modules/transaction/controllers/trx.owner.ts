import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import _ from 'lodash'
import { ITransaction } from 'modules/transaction/transaction.interfaces'
import Transaction from 'modules/transaction/transaction.model'
import { GetTransactionsQueryParam } from 'modules/transaction/transaction.schema'
import { FilterQuery, PaginateOptions } from 'mongoose'
import ApiResponse from 'utils/api-response'

export async function getOwnerTransactionsHandler(
  request: FastifyRequest<{
    Querystring: GetTransactionsQueryParam
  }>
) {
  const query: FilterQuery<ITransaction> = _.pick(request.query, ['name'])
  const options: PaginateOptions = _.pick(request.query, ['limit', 'sort', 'page'])

  const queryRequest = {
    ...query,
    user: request.user.id
  }

  Object.assign(options, {
    populate: [
      {
        path: 'user',
        select: 'name nis id'
      },
      {
        path: 'orders'
      }
    ]
  })

  const res = await Transaction.paginate(queryRequest, options)

  return new ApiResponse(httpStatus.OK, 'getOwnerTransactionsHandler', res)
}
