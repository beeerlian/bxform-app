import { FastifyInstance } from 'fastify'
import {
  createBookHandler,
  deleteBookHandler,
  editBookHandler,
  getBookHandler,
  getBooksHandler
} from './book.controller'
import { $ref, bookSchemas } from './book.schema'

async function bookRoutes(server: FastifyInstance) {
  // ** Public Routes **
  server.get(
    '/',
    {
      schema: {
        params: $ref('getBooksQueryParamSchema')
      }
    },
    getBooksHandler
  )

  server.get(
    '/:id',
    {
      schema: {
        params: $ref('getParamBookSchema')
      }
    },
    getBookHandler
  )

  // ** Admin Routes **
  server.get(
    '/admin',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('getBooksQueryParamSchema')
      }
    },
    getBooksHandler
  )

  server.get(
    '/admin/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('getParamBookSchema')
      }
    },
    getBookHandler
  )

  server.post(
    '/admin',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        body: $ref('createBodyBookSchema')
      }
    },
    createBookHandler
  )

  server.put(
    '/admin/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        body: $ref('editBodyBookSchema'),
        params: $ref('editParamBookSchema')
      }
    },
    editBookHandler
  )

  server.delete(
    '/admin/:id',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin', 'admin'])],
      schema: {
        params: $ref('deleteParamBookSchema')
      }
    },
    deleteBookHandler
  )

  for (const schema of bookSchemas) {
    server.addSchema(schema)
  }
}

export default bookRoutes
