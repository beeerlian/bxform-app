import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const paymentMethodSchema = z.enum([
  'xendit-ewallet-ovo',
  'xendit-ewallet-dana',
  'xendit-ewallet-linkaja',
  'xendit-ewallet-shopeepay'
])

const anySchema = z.record(z.any())

const createPaymentSchema = z.object({
  type: z.enum(['installment']),
  method: z.object({
    id: paymentMethodSchema,
    provider: z.enum(['xendit']),
    fee: z.number(),
    feeType: z.enum(['fixed', 'percentage']),
    calculatedAmountFee: z.number(),
    totalAmount: z.number(),
    nominal: z.number(),
    image: z.string(),
    name: z.string()
  })
})

const getPaymentMethods = z.object({
  nominal: z.number()
})

const getPaymentStatus = z.object({
  refId: z.string(),
  provider: z.enum(['xendit']),
  method: paymentMethodSchema
})

export type AnySchema = z.infer<typeof anySchema>
export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>
export type GetPaymentMethods = z.infer<typeof getPaymentMethods>
export type GetPaymentStatus = z.infer<typeof getPaymentStatus>

export const { schemas: paymentSchemas, $ref } = buildJsonSchemas(
  {
    anySchema,
    createPaymentSchema,
    getPaymentMethods,
    getPaymentStatus
  },
  { $id: 'paymentSchema' }
)
