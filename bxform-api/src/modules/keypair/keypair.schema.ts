import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

// ** Any Schema **
const anySchema = z.any()
export type AnySchema = z.infer<typeof anySchema>

// ** Sigin Schema **
const siginSchema = z.object({
  privateKey: z.string(),
  data: z.string()
})
export type SiginSchema = z.infer<typeof siginSchema>

// ** Verify Schema **
const verifySchema = z.object({
  publicKey: z.string(),
  signature: z.string(),
  data: z.string()
})
export type VerifySchema = z.infer<typeof verifySchema>

export const { schemas: keypairSchemas, $ref } = buildJsonSchemas(
  {
    anySchema,
    siginSchema,
    verifySchema
  },
  { $id: 'keypairSchema' }
)
