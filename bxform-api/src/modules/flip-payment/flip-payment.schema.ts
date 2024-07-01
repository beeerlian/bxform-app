import { buildJsonSchemas } from 'fastify-zod'
import { flipQueryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const getAllBillsQueryParamSchema = z.object({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  sort_by: z.enum(['id', 'bill_link', 'bill_title', 'sender_bank', 'amount', 'created_at']).optional(),
  ...flipQueryPaginationsSchema
})

const createBillQueryInputSchema = z.object({
  type: z.enum(['installment']),
  method: z.object({
    provider: z.enum(['flip']),
    fee: z.number(),
    feeType: z.enum(['fixed', 'percentage']),
    calculatedAmountFee: z.number(),
    totalAmount: z.number(),
    nominal: z.number(),
    image: z.string(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    bankCode: z.string(),
    bankType: z.enum(['virtual_account', 'bank_account', 'wallet_account'])
  })
})
const getBillParamSchema = z.object({
  id: z.string().nonempty()
})

export type GetAllBillsQueryParam = z.infer<typeof getAllBillsQueryParamSchema>
export type GetBillParam = z.infer<typeof getBillParamSchema>
export type CreateBillInput = z.infer<typeof createBillQueryInputSchema>

export const { schemas: flipPaymentSchema, $ref } = buildJsonSchemas(
  {
    getAllBillsQueryParamSchema,
    getBillParamSchema,
    createBillQueryInputSchema
  },
  { $id: 'flipPaymentSchema' }
)
