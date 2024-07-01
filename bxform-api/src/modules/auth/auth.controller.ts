import {
  ChangePhoneNumber,
  LoginAdminSchema,
  UserCekLoginSchema,
  UserLoginSchema,
  UserRegisterSchema,
  UserRegisterSuperAdminOnlySchema,
  VerifyChangePhoneNumber
} from 'auth/auth.schema'
import config from 'configs/config'
import { roleTypes } from 'configs/roles'
import { FastifyReply, FastifyRequest } from 'fastify'
import httpStatus from 'http-status'
import jwt, { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import User from 'user/user.model'
import { userStatusTypes } from 'user/user.types'
import ApiError from 'utils/api-error'
import ApiResponse from 'utils/api-response'
import { sendMobileVerificationEmail } from 'utils/email/email.service'
import { verifyPassword } from 'utils/enc-password'
import { firebase } from 'utils/firebase/firebase'
import { generateAccessToken, generateChangeEmailToken } from 'utils/token/token.service'

const loginAdminHandler = async (
  request: FastifyRequest<{
    Body: LoginAdminSchema
  }>,
  reply: FastifyReply
) => {
  const { body } = request

  const user = await User.findOne({
    email: body.email
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (user.role !== roleTypes.ADMIN && user.role !== roleTypes.SUPERADMIN) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User role not authorized')
  }

  // verify password
  const correctPassword = verifyPassword({
    encryptedPassword: user.secret.encryptedPassword,
    salt: user.secret.salt,
    iv: user.secret.iv,
    password: body.password
  })

  if (!correctPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password')
  }

  const result = {
    token: await generateAccessToken(user, reply),
    user
  }

  return new ApiResponse(httpStatus.OK, 'login successfully', result)
}

const userResgisterSuperAdminOnly = async (
  request: FastifyRequest<{
    Body: UserRegisterSuperAdminOnlySchema
  }>,
  reply: FastifyReply
) => {
  const { body } = request

  const user = await User.findOne({
    nis: body.nis
  })

  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already registered')
  }

  // verify password
  const reqBody = {
    name: body.name,
    nis: body.nis,
    email: body.email,
    password: body.password,
    status: userStatusTypes.ACTIVE,
    role: roleTypes.USER,
    fcm: body.fcm
  }

  const newUser = await User.create(reqBody)

  const result = {
    token: await generateAccessToken(newUser, reply),
    user
  }

  return new ApiResponse(httpStatus.OK, 'userResgisterSuperAdminOnly successfully', result)
}

const userCekLoginHandler = async (
  request: FastifyRequest<{
    Body: UserCekLoginSchema
  }>
) => {
  const { body } = request

  const user = await User.findOne({
    nis: `${body.nis}`
  })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Kamu belum terdaftar mohon hubungi admin koperasi')
  }

  if (body.fcm) {
    await user.updateOne({
      'token.fcmToken': body.fcm
    })
  }

  if (user.status === userStatusTypes.ACTIVE) {
    return new ApiResponse(httpStatus.OK, 'login successfully', {
      isRegistered: true,
      user
    })
  }

  return new ApiResponse(httpStatus.OK, 'userResgisterSuperAdminOnly successfully', {
    isRegistered: false
  })
}

const userRegisterHandler = async (
  request: FastifyRequest<{
    Body: UserRegisterSchema
  }>,
  reply: FastifyReply
) => {
  const { body } = request

  const user = await User.findOne({
    nis: `${body.nis}`
  })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User belum terdaftar mohon hubungi admin')
  }

  const emailExist = await User.findOne({
    email: body.email
  })

  if (emailExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email sudah terdaftar')
  }

  const phoneExist = await User.findOne({
    phone: body.phone
  })

  if (phoneExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Nomor telepon sudah terdaftar')
  }

  if (user.status === userStatusTypes.ACTIVE) {
    return new ApiResponse(httpStatus.OK, 'register successfully', {
      isRegistered: true,
      token: await generateAccessToken(user, reply),
      user
    })
  }

  Object.assign(user, {
    email: body.email,
    phone: body.phone,
    status: userStatusTypes.ACTIVE
  })

  await user.save()

  return new ApiResponse(httpStatus.OK, 'login successfully', {
    isRegistered: true,
    token: await generateAccessToken(user, reply),
    user
  })
}

const userLoginHandler = async (
  request: FastifyRequest<{
    Body: UserLoginSchema
  }>,
  reply: FastifyReply
) => {
  const { body } = request

  const user = await User.findOne({
    nis: `${body.nis}`,
    phone: body.phone
  })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Belum terdaftar')
  }

  // ** Auto Login for testing
  if (user.nis === '20210003') {
    const result = {
      token: await generateAccessToken(user, reply),
      user
    }

    return new ApiResponse(httpStatus.OK, 'login successfully', result)
  }

  await firebase
    .auth()
    .verifyIdToken(body.firebaseToken)
    .catch(e => {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token')
    })

  return new ApiResponse(httpStatus.OK, 'login successfully', {
    token: await generateAccessToken(user, reply),
    user
  })
}

const changePhoneNumberHandler = async (
  request: FastifyRequest<{
    Body: ChangePhoneNumber
  }>
) => {
  const { body } = request

  const user = await User.findOne({
    nis: `${body.nis}`,
    status: userStatusTypes.ACTIVE
  })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User tidak ditemukan atau belum terdaftar')
  }

  // ** Generate Token Verificantion
  const { token: verificationToken, expires: ExpirationDate } = await generateChangeEmailToken(user.id)

  // ** Update Temp Token User
  await user.updateOne({
    'token.tempToken': verificationToken
  })

  // ** Send Email
  sendMobileVerificationEmail(user.email, verificationToken, ExpirationDate.format('DD/MM/YYYY HH:mm'))

  return new ApiResponse(httpStatus.OK, 'Email verifikasi telah dikirim ke email anda')
}

const verifyChangePhoneNumberHandler = async (
  request: FastifyRequest<{
    Body: VerifyChangePhoneNumber
  }>
) => {
  const { body } = request

  // ** Verify Token
  let payload: string | JwtPayload | null = null

  try {
    payload = jwt.verify(body.token, config.jwt.secret)
  } catch (err: JsonWebTokenError | TokenExpiredError | NotBeforeError | Error | any) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message)
  }

  if (!payload.sub) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Your are not authorized')
  }

  const user = await User.findById(payload.sub)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  // ** Check Temp Token
  if (user.token.tempToken !== body.token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token tidak valid')
  }

  // ** Update User Phone Number & Remove Temp Token
  // ** Check if phone format is valid
  let phone = body.phone

  if (phone[0] === '0') {
    phone = phone.replace('0', '+62')
  }

  // ** Check if phone number not have +62 country code
  if (phone[0] !== '+') {
    phone = `+62${phone}`
  }

  await user.updateOne({
    phone,
    'token.tempToken': null
  })

  return new ApiResponse(httpStatus.OK, 'Nomor telepon berhasil diubah', {
    isSuccess: true
  })
}

export {
  changePhoneNumberHandler,
  loginAdminHandler,
  userCekLoginHandler,
  userLoginHandler,
  userRegisterHandler,
  userResgisterSuperAdminOnly,
  verifyChangePhoneNumberHandler
}
