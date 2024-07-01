import config from 'configs/config'
import { FastifyListenOptions } from 'fastify'
import mongoose from 'mongoose'
import fastify from 'src/app'
import { runUserSeeder } from 'user/user.seeder'
import logger from 'utils/logger'

let app: any

const options: FastifyListenOptions = {
  port: parseInt(config.api.port),
  host: '0.0.0.0'
}

;(async () => {
  try {
    mongoose.connect(config.mongo.uri).then(async () => {
      logger.info('🍃🍃🍃 Connected to MongoDB')

      app = await fastify()

      app.listen(options)

      // Seed User
      await runUserSeeder()

      logger.info(`🤲 Commit msg: fix bug nominal `)
      logger.info(`🤲 Bismillaah...`)
      logger.info(`🤲 Ahamdulillah...`)
      logger.info(`🚀🚀🚀 Server started`)
      logger.info(`🚀🚀🚀 Run on host (${options.host}) port (${config.api.port}) env (${config.env})`)
    })
  } catch (e) {
    logger.error(e)
    process.exit(1)
  }
})()

const exitHandler = () => {
  if (app) {
    app.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: string) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (app) {
    app.close()
  }
})
