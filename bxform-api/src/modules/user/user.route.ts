import { FastifyInstance } from 'fastify'
import { getUserDetailHandler, getUserMe, getUserQueryHandler, importUsers } from 'user/user.controller'
import { $ref, userSchemas } from 'user/user.schema'
import { uploadMulterSingle } from 'utils/multer.utils'

async function userRoutes(server: FastifyInstance) {
  server.get(
    '/admin/users',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        querystring: $ref('getUsersQuerySchema')
      }
    },
    getUserQueryHandler
  )

  server.post(
    '/admin/import',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin']), uploadMulterSingle('file')]
    },
    importUsers
  )

  server.post(
    '/me',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin', 'user'])],
      schema: {
        body: $ref('getUserMe')
      }
    },
    getUserMe
  )

  server.get(
    '/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin', 'user'])],
      schema: {
        params: $ref('getUserDetailParamSchema')
      }
    },
    getUserDetailHandler
  )

  for (const schema of userSchemas) {
    server.addSchema(schema)
  }
}

export default userRoutes
