import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const createBodySampleSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty().email()
})

const editBodySampleSchema = z.object({
  name: z.string().nonempty()
})

const getSamplesQueryParamSchema = z.object({
  name: z.string().optional(),
  ...queryPaginationsSchema
})

const editParamSampleSchema = z.object({
  id: z.string().nonempty()
})

const getParamSampleSchema = z.object({
  id: z.string().nonempty()
})

const deleteParamSampleSchema = z.object({
  id: z.string().nonempty()
})

export type CreateSampleInput = z.infer<typeof createBodySampleSchema>
export type EditSampleInput = z.infer<typeof editBodySampleSchema>
export type EditSampleParam = z.infer<typeof editParamSampleSchema>
export type GetSamplesQueryParam = z.infer<typeof getSamplesQueryParamSchema>
export type GetSampleParam = z.infer<typeof getParamSampleSchema>
export type DeleteSampleParam = z.infer<typeof deleteParamSampleSchema>

export const { schemas: sampleSchemas, $ref } = buildJsonSchemas(
  {
    createBodySampleSchema,
    editBodySampleSchema,
    editParamSampleSchema,
    getSamplesQueryParamSchema,
    getParamSampleSchema,
    deleteParamSampleSchema
  },
  { $id: 'sampleSchema' }
)
