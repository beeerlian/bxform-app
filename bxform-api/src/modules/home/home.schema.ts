import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const createBodyhomeSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty().email()
})

const editBodyhomeSchema = z.object({
  name: z.string().nonempty()
})

const gethomesQueryParamSchema = z.object({
  name: z.string().optional(),
  ...queryPaginationsSchema
})

const editParamhomeSchema = z.object({
  id: z.string().nonempty()
})

const getParamhomeSchema = z.object({
  id: z.string().nonempty()
})

const deleteParamhomeSchema = z.object({
  id: z.string().nonempty()
})

export type CreatehomeInput = z.infer<typeof createBodyhomeSchema>
export type EdithomeInput = z.infer<typeof editBodyhomeSchema>
export type EdithomeParam = z.infer<typeof editParamhomeSchema>
export type GethomesQueryParam = z.infer<typeof gethomesQueryParamSchema>
export type GethomeParam = z.infer<typeof getParamhomeSchema>
export type DeletehomeParam = z.infer<typeof deleteParamhomeSchema>

export const { schemas: homeSchemas, $ref } = buildJsonSchemas(
  {
    createBodyhomeSchema,
    editBodyhomeSchema,
    editParamhomeSchema,
    gethomesQueryParamSchema,
    getParamhomeSchema,
    deleteParamhomeSchema
  },
  { $id: 'homeSchema' }
)
