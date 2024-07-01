import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const createBodyTransactionSchema = z.object({
  amount: z.number().nonnegative(),
  type: z.enum(['installment']),
  orders: z.array(z.string()).optional()
})

const editBodyTransactionSchema = z.object({
  name: z.string().nonempty()
})

const getTransactionsQueryParamSchema = z.object({
  ...queryPaginationsSchema
})

const getParamTransactionSchema = z.object({
  id: z.string().nonempty()
})

const deleteParamTransactionSchema = z.object({
  id: z.string().nonempty()
})

const anySchema = z.record(z.any())

const trxInvoiceInquirySchema = z.object({
  invoiceId: z.string().nonempty()
})

const getTransactionByOrderIdSchema = z.object({
  orderId: z.string().nonempty()
})

export type CreateTransactionInput = z.infer<typeof createBodyTransactionSchema>
export type EditTransactionInput = z.infer<typeof editBodyTransactionSchema>
export type GetTransactionsQueryParam = z.infer<typeof getTransactionsQueryParamSchema>
export type GetTransactionParam = z.infer<typeof getParamTransactionSchema>
export type DeleteTransactionParam = z.infer<typeof deleteParamTransactionSchema>
export type TrxInquirySchema = z.infer<typeof trxInvoiceInquirySchema>
export type GetTransactionByOrderIdSchema = z.infer<typeof getTransactionByOrderIdSchema>

export type AnySchema = z.infer<typeof anySchema>

export const { schemas: transactionSchemas, $ref } = buildJsonSchemas(
  {
    createBodyTransactionSchema,
    editBodyTransactionSchema,
    getTransactionsQueryParamSchema,
    getParamTransactionSchema,
    deleteParamTransactionSchema,
    anySchema,
    trxInvoiceInquirySchema,
    getTransactionByOrderIdSchema
  },
  { $id: 'transactionSchema' }
)
