import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const updateCartSchema = z.object({
  item: z.string().nonempty()
})

const getCartsQueryParamSchema = z.object({
  user: z.string().optional(),
  ...queryPaginationsSchema
})

const getCartOwner = z.object({
  userID: z.string().nonempty()
})

export type UpdateCartInput = z.infer<typeof updateCartSchema>
export type GetCartsQueryParam = z.infer<typeof getCartsQueryParamSchema>
export type GetCartParam = z.infer<typeof getCartOwner>

// export type EditCartInput = z.infer<typeof editBodyCartSchema>
// export type EditCartParam = z.infer<typeof editParamCartSchema>
// export type DeleteCartParam = z.infer<typeof deleteParamCartSchema>

export const { schemas: cartSchemas, $ref } = buildJsonSchemas(
  {
    updateCartSchema,
    getCartsQueryParamSchema,
    getCartOwner
  },
  { $id: 'cartSchema' }
)
