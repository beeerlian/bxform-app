import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

import cors from '@fastify/cors'
import fastifyFormBody from '@fastify/formbody'
import helmet from '@fastify/helmet'
import '@fastify/jwt'
import fastifyMiddie from '@fastify/middie'
import fastifyRateLimit from '@fastify/rate-limit'

import { JWT } from '@fastify/jwt'
import config from 'configs/config'
import multer from 'fastify-multer'
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import routes from 'src/routes'
import ApiError from 'utils/api-error'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number
      email: string
      name: string
      role: string
      phone: string
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
    doc: any
  }

  export interface FastifyInstance {
    authenticate: any
    role: any
    owner: any
  }
}

// PLUGINS
const build = async () => {
  let app

  if (config.env == 'production') {
    app = Fastify()
  } else {
    app = Fastify()
  }

  await app.register(fastifyMiddie)
  await app.register(fastifyFormBody)
  await app.register(cors)
  await app.register(helmet)
  await app.register(multer.contentParser)
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute'
  })

  app.use(require('dns-prefetch-control')())
  app.use(require('frameguard')())
  app.use(require('hsts')())
  app.use(require('ienoopen')())
  app.use(require('x-xss-protection')())

  await app.register(require('@fastify/jwt'), {
    secret: {
      private: config.jwt.privateKey,
      public: config.jwt.publicKey
    },
    sign: { algorithm: 'RS256' }
  })

  app.addHook('preHandler', (req, reply, next) => {
    req.jwt = app.jwt

    return next()
  })

  app.addHook('preHandler', (req, reply, done) => {
    // ** Ignore Some Routes **
    if (req.url == '/healthcheck') return done()
    if (req.url == '/v1/transaction/invoice_callback') return done()
    if (req.url == '/v1/payment/xendit/ewallet/status') return done()
    if (req.url == '/v1/payment/xendit/ewallet/reconciliation') return done()

    const apiKey = req.headers['x-api-key']

    if (apiKey === config.credential.apiKey) return done()

    if (!apiKey || apiKey !== config.credential.apiKey) {
      return done(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized API Key'))
    }

    done()
  })

  // HOOKS
  // AUTH GUARD
  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (e) {
      throw new ApiError(httpStatus.UNAUTHORIZED, httpStatus[401], 'Unauthorized')
    }
  })

  // ROLE GUARD
  app.decorate('role', {
    is: (roles: string[]) => async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify()

      if (!roles.includes(request.user.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, httpStatus[403], 'Forbidden')
      }
    }
  })

  app.decorate('owner', {
    model: (model: mongoose.Model<any>, ownerKey: string) => async (request: any, reply: FastifyReply) => {
      const doc = await model.findById(request.params.id)

      if (!doc) {
        throw new ApiError(httpStatus.NOT_FOUND, httpStatus[404], 'Not Found')
      }

      if (doc[ownerKey] != request.user.id) {
        throw new ApiError(httpStatus.FORBIDDEN, httpStatus[403], 'Forbidden')
      }

      request.doc = doc
    }
  })

  // ROUTES
  app.get('/healthcheck', async function (req, res) {
    return 'OK'
  })

  await app.register(routes, { prefix: '/v1' })

  return app
}

export default build
