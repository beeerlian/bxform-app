import { UserRegisterSchema } from 'auth/auth.schema'
import { FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import User from 'user/user.model'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'

const authCustomRegisterHandler = async (
  request: FastifyRequest<{
    Body: UserRegisterSchema
  }>
) => {
  const { body } = request

  const email = await User.findOne({
    email: body.email
  })

  if (email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email anda sudah terdaftar')
  }

  const nis = await User.findOne({
    nis: body.nis
  })

  if (nis) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'NIS anda sudah terdaftar')
  }

  const phone = await User.findOne({
    phone: body.phone
  })

  if (phone) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Nomor telepon anda sudah terdaftar')
  }

  // ** Send Email Verification
  return new ApiResponse(httpStatus.CREATED, 'User registered successfully')
}
