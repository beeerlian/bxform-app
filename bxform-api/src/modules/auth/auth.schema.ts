import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const loginAdminSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8, 'Password must be at least 8 characters').nonempty()
})

const userCekLoginSchema = z.object({
  nis: z.string().nonempty(),
  fcm: z.string().optional()
})

const userRegisterSuperAdminOnly = z.object({
  name: z.string().nonempty(),
  nis: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8, 'Password must be at least 8 characters').nonempty(),
  fcm: z.string().optional()
})

const userRegisterSchema = z.object({
  nis: z.string().nonempty(),
  email: z.string().email().nonempty(),
  phone: z.string().nonempty()
})

const userLoginSchema = z.object({
  nis: z.string().nonempty(),
  phone: z.string().nonempty(),
  firebaseToken: z.string().nonempty()
})

const changePhoneNumber = z.object({
  nis: z.string().nonempty()
})

const verifyChangePhoneNumber = z.object({
  token: z.string().nonempty(),
  phone: z.string().nonempty()
})

export type LoginAdminSchema = z.infer<typeof loginAdminSchema>
export type UserRegisterSuperAdminOnlySchema = z.infer<typeof userRegisterSuperAdminOnly>
export type UserCekLoginSchema = z.infer<typeof userCekLoginSchema>
export type UserLoginSchema = z.infer<typeof userLoginSchema>
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>
export type ChangePhoneNumber = z.infer<typeof changePhoneNumber>
export type VerifyChangePhoneNumber = z.infer<typeof verifyChangePhoneNumber>

const customRegisterSchema = z.object({
  name: z.string().nonempty(),
  nis: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(8, 'Password must be at least 8 characters').nonempty(),
  fcm: z.string().optional()
})

export type CustomRegisterSchema = z.infer<typeof customRegisterSchema>

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    loginAdminSchema,
    userRegisterSchema,
    userRegisterSuperAdminOnly,
    userCekLoginSchema,
    userLoginSchema,
    changePhoneNumber,
    verifyChangePhoneNumber,
    customRegisterSchema
  },
  { $id: 'authSchema' }
)
