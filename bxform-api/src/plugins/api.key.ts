import config from 'configs/config'
import { FastifyPluginCallback } from 'fastify'
import httpStatus from 'http-status'
import ApiError from 'utils/api-error'

// Custom Fastify plugin for API key authorization
const apiKeyAuthorization: FastifyPluginCallback = (fastify, options, next) => {
  fastify.addHook('preHandler', (req, reply, done) => {
    const apiKey = req.headers['x-api-key']
    const hostname = req.hostname

    if (!apiKey || !hostname || apiKey !== config.credential.apiKey || hostname !== config.credential.hostName) {
      return done(new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized'))
    }

    // API key is valid, proceed to the route handler
    done()
  })

  next()
}

export default apiKeyAuthorization
