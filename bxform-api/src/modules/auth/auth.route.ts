import {
  changePhoneNumberHandler,
  loginAdminHandler,
  userCekLoginHandler,
  userLoginHandler,
  userRegisterHandler,
  userResgisterSuperAdminOnly,
  verifyChangePhoneNumberHandler
} from 'auth/auth.controller'
import { $ref, authSchemas } from 'auth/auth.schema'
import { FastifyInstance } from 'fastify'

async function authRoutes(server: FastifyInstance) {
  server.post(
    '/superadmin/create_user',
    {
      preHandler: [server.authenticate, server.role.is(['superAdmin'])],
      schema: {
        body: $ref('userRegisterSuperAdminOnly')
      }
    },
    userResgisterSuperAdminOnly
  )

  server.post(
    '/admin/login',
    {
      schema: {
        body: $ref('loginAdminSchema')
      }
    },
    loginAdminHandler
  )

  server.post(
    '/cek-login',
    {
      schema: {
        body: $ref('userCekLoginSchema')
      }
    },
    userCekLoginHandler
  )

  server.post(
    '/register',
    {
      schema: {
        body: $ref('userRegisterSchema')
      }
    },
    userRegisterHandler
  )

  server.post(
    '/login',
    {
      schema: {
        body: $ref('userLoginSchema')
      }
    },
    userLoginHandler
  )

  server.post(
    '/change-phone-number',
    {
      schema: {
        body: $ref('changePhoneNumber')
      }
    },
    changePhoneNumberHandler
  )

  server.post(
    '/verify-change-phone-number',
    {
      schema: {
        body: $ref('verifyChangePhoneNumber')
      }
    },
    verifyChangePhoneNumberHandler
  )

  for (const schema of authSchemas) {
    server.addSchema(schema)
  }
}

export default authRoutes
