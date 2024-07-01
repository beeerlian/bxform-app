import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const createBodyBookSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().int().min(1000),
  class: z.string().nonempty(),
  semester: z.string().nonempty(),
  description: z.string().optional(),
  images: z.array(z.string()).optional()
})

const editBodyBookSchema = z.object({
  name: z.string().nonempty()
})

const getBooksQueryParamSchema = z.object({
  name: z.string().optional(),
  ...queryPaginationsSchema
})

const editParamBookSchema = z.object({
  id: z.string().nonempty()
})

const getParamBookSchema = z.object({
  id: z.string().nonempty()
})

const deleteParamBookSchema = z.object({
  id: z.string().nonempty()
})

export type CreateBookInput = z.infer<typeof createBodyBookSchema>
export type EditBookInput = z.infer<typeof editBodyBookSchema>
export type EditBookParam = z.infer<typeof editParamBookSchema>
export type GetBooksQueryParam = z.infer<typeof getBooksQueryParamSchema>
export type GetBookParam = z.infer<typeof getParamBookSchema>
export type DeleteBookParam = z.infer<typeof deleteParamBookSchema>

export const { schemas: bookSchemas, $ref } = buildJsonSchemas(
  {
    createBodyBookSchema,
    editBodyBookSchema,
    editParamBookSchema,
    getBooksQueryParamSchema,
    getParamBookSchema,
    deleteParamBookSchema
  },
  { $id: 'bookSchema' }
)
