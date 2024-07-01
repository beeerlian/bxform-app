import config from 'configs/config'
import { FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const generateAccessToken = async (user: any, reply: FastifyReply) => {
  return await reply.jwtSign(
    {
      ...user.toJSON()
    },
    {
      expiresIn: '31d'
    }
  )
}

export const generateChangeEmailToken = async (userId: String, expiresIn?: moment.Moment): Promise<any> => {
  const expires = expiresIn ? expiresIn : moment().add(1, 'hours')
  const verifyEmailToken = jwt.sign(
    {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix()
    },
    config.jwt.secret
  )

  return {
    token: verifyEmailToken,
    expires
  }
}

export const verifyEmailToken = async (email: String, expiresIn?: moment.Moment): Promise<any> => {
  const expires = expiresIn ? expiresIn : moment().add(1, 'hours')
  const verifyEmailToken = jwt.sign(
    {
      sub: email,
      iat: moment().unix(),
      exp: expires.unix()
    },
    config.jwt.secret
  )

  return {
    token: verifyEmailToken,
    expires
  }
}
