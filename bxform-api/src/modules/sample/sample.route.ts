import { FastifyInstance } from 'fastify'
import {
  createSampleHandler,
  deleteSampleHandler,
  editSampleHandler,
  getSampleHandler,
  getSamplesHandler
} from './sample.controller'
import { $ref, sampleSchemas } from './sample.schema'

async function sampleRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin'])],
      schema: {
        body: $ref('createBodySampleSchema')
      }
    },
    createSampleHandler
  )

  server.put(
    '/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin'])],
      schema: {
        body: $ref('editBodySampleSchema'),
        params: $ref('editParamSampleSchema')
      }
    },
    editSampleHandler
  )

  server.get(
    '/',
    {
      preHandler: [server.authenticate, server.role.is(['admin', 'superAdmin'])],
      schema: {
        params: $ref('getSamplesQueryParamSchema')
      }
    },
    getSamplesHandler
  )

  server.get(
    '/:id',
    {
      preHandler: [server.authenticate, server.role.is(['admin', 'superAdmin'])],
      schema: {
        params: $ref('getParamSampleSchema')
      }
    },
    getSampleHandler
  )

  server.delete(
    '/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin'])],
      schema: {
        params: $ref('deleteParamSampleSchema')
      }
    },
    deleteSampleHandler
  )

  for (const schema of sampleSchemas) {
    server.addSchema(schema)
  }
}

export default sampleRoutes
