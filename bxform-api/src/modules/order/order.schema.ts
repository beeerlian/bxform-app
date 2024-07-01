import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const createBodyOrderSchema = z.object({})

const getOrderMe = z.object({
  ...queryPaginationsSchema
})

const editBodyOrderSchema = z.object({
  name: z.string().nonempty()
})

const getOrdersQueryParamSchema = z.object({
  name: z.string().optional(),
  ...queryPaginationsSchema
})

const idParamSchema = z.object({
  id: z.string().nonempty()
})

const getParamOrderSchema = z.object({
  id: z.string().nonempty()
})

const deleteParamOrderSchema = z.object({
  id: z.string().nonempty()
})

const acceptPickupSchema = z.object({
  verificationCode: z.string().nonempty()
})

export type CreateOrderInput = z.infer<typeof createBodyOrderSchema>
export type GetOrderMe = z.infer<typeof getOrderMe>
export type EditOrderInput = z.infer<typeof editBodyOrderSchema>
export type GetOrdersQueryParam = z.infer<typeof getOrdersQueryParamSchema>
export type GetOrderParam = z.infer<typeof getParamOrderSchema>
export type DeleteOrderParam = z.infer<typeof deleteParamOrderSchema>
export type IdParamSchema = z.infer<typeof idParamSchema>
export type AcceptPickupSchema = z.infer<typeof acceptPickupSchema>

export const { schemas: orderSchemas, $ref } = buildJsonSchemas(
  {
    createBodyOrderSchema,
    getOrderMe,
    editBodyOrderSchema,
    idParamSchema,
    getOrdersQueryParamSchema,
    getParamOrderSchema,
    deleteParamOrderSchema,
    acceptPickupSchema
  },
  { $id: 'orderSchema' }
)
