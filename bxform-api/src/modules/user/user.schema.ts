import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const getUserDetailParamSchema = z.object({
  id: z.string()
})

const getUserMe = z.object({
  updateTotalCredit: z.boolean().optional(),
  fcmToken: z.string().optional()
})

const getUsersQuerySchema = z.object({
  query: z.string().optional(),
  pagination: z.string().optional()
})

export type GetUserDetailParamSchema = z.infer<typeof getUserDetailParamSchema>
export type GetUsersQuerySchema = z.infer<typeof getUsersQuerySchema>
export type GetUserMeSchema = z.infer<typeof getUserMe>

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    getUserDetailParamSchema,
    getUsersQuerySchema,
    getUserMe
  },
  { $id: 'userSchema' }
)
