import csv from 'csv-parser'
import { FastifyReply, FastifyRequest } from 'fastify'
import { createReadStream } from 'fs'
import httpStatus from 'http-status'
import _ from 'lodash'
import { MulterFile } from 'modules/file/file.interfaces'
import Order from 'modules/order/order.model'
import { orderStatusTypes } from 'modules/order/order.types'
import User from 'modules/user/user.model'
import { GetUserDetailParamSchema, GetUserMeSchema, GetUsersQuerySchema } from 'modules/user/user.schema'
import { IUser } from 'modules/user/user.types'
import { FilterQuery } from 'mongoose'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'
import { removeLocalFile } from 'utils/file-system.utils'
import { isValidJSON } from 'utils/json.utils'

const getUserDetailHandler = async (
  req: FastifyRequest<{
    Querystring: GetUsersQuerySchema
    Params: GetUserDetailParamSchema
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params

  const user = await User.findById(id)
  return new ApiResponse(httpStatus.OK, 'getUserDetailHandler successfully', user)
}

const getUserQueryHandler = async (
  req: FastifyRequest<{
    Querystring: GetUsersQuerySchema
  }>,
  reply: FastifyReply
) => {
  let filter = {}
  let options = {}

  let query: FilterQuery<IUser> = _.pick(req.query, ['query', 'pagination'])

  if (query.query && isValidJSON(query.query)) {
    filter = await JSON.parse(query.query)
  }

  if (query.pagination && isValidJSON(query.pagination)) {
    options = await JSON.parse(query.pagination)
  }

  const users = await User.paginate(filter, options)
  return new ApiResponse(httpStatus.OK, 'getUserQueryHandler successfully', users)
}

const importUsers = async (req: any, reply: FastifyReply) => {
  const file: MulterFile = req.file

  if (file.mimetype !== 'text/csv') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'File type is not csv')
  }

  const data: any = []

  await new Promise<void>(resolve => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    createReadStream(file.path)
      .pipe(csv())
      .on('data', item => data.push(item))
      .on('error', () => {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Terjadi kesalahan saat upoload file')
      })
      .on('end', () => {
        resolve()
      })
  })

  const newResult: any = []

  // VALIDATE FILE FORMAT
  await new Promise<void>(resolve => {
    for (let i = 0; i < data.length; i += 1) {
      const element = data[i]
      const errors: any = []

      if (!element.name || _.isEmpty(element.name)) {
        errors.push({
          field: 'name',
          message: '"name" is required',
          row: i
        })
      }

      if (!element.nis || _.isEmpty(element.nis)) {
        errors.push({
          field: 'nis',
          message: '"nis" is required',
          row: 1
        })
      }

      if (!_.isEmpty(errors)) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Validation error not found', errors)
      } else {
        newResult.push({
          nis: element.nis.replace('-', ''),
          profile: {
            name: element.name.replace('-', '')
          }
        })
      }
    }

    resolve()
  })

  // REMOVE FILE
  await removeLocalFile(file.path)

  await User.insertMany(newResult)
    .then(function () {})
    .catch(function (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message) // Failure
    })

  return new ApiResponse(httpStatus.OK, 'users imported successfully')
}

export const getUserMe = async (
  req: FastifyRequest<{
    Body: GetUserMeSchema
  }>,
  reply: FastifyReply
) => {
  const { updateTotalCredit, fcmToken } = req.body

  const user = await User.findById(req.user.id)

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  let totalCredit = 0

  if (updateTotalCredit) {
    const orders = await Order.find({ buyer: req.user.id, status: orderStatusTypes.ACTIVE })

    orders.forEach(order => {
      totalCredit += order.totalUnpaidAmount
    })

    Object.assign(user, {
      totalCredit: totalCredit
    })
  }

  if (fcmToken) {
    Object.assign(user, {
      token: {
        ...user.token,
        fcmToken: fcmToken
      }
    })
  }

  if (fcmToken || updateTotalCredit) {
    await user.save()
  }

  return new ApiResponse(httpStatus.OK, 'getUserMe successfully', user)
}

export { getUserDetailHandler, getUserQueryHandler, importUsers }
