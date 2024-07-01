import { FastifyInstance } from 'fastify'
import { uploadMulterFields, uploadMulterSingle } from 'utils/multer.utils'
import { createFileHandler, createFilesHandler, getFileHandler, getFilesHandler } from './file.controller'
import { $ref, fileSchemas } from './file.schema'

async function fileRoutes(server: FastifyInstance) {
  // ** Admin Routes **
  server.post(
    '/admin/single',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin']), uploadMulterSingle('file')]
    },
    createFileHandler
  )

  server.post(
    '/admin',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin']), uploadMulterFields(['files'])]
    },
    createFilesHandler
  )

  server.get(
    '/admin',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('getFilesQueryParamSchema')
      }
    },
    getFilesHandler
  )

  server.get(
    '/admin/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('getParamFileSchema')
      }
    },
    getFileHandler
  )

  for (const schema of fileSchemas) {
    server.addSchema(schema)
  }
}

export default fileRoutes
