import { FastifyInstance } from 'fastify'
import { getHomeHandler } from 'modules/home/controller/home.get'
import { homeSchemas } from './home.schema'

async function homeRoutes(server: FastifyInstance) {
  server.get('/', {}, getHomeHandler)

  for (const schema of homeSchemas) {
    server.addSchema(schema)
  }
}

export default homeRoutes
