import { buildJsonSchemas } from 'fastify-zod'
import { queryPaginationsSchema } from 'schemas/pagination'
import { z } from 'zod'

const createBodyFileSchema = z.object({
  customId: z.string().optional(),
  name: z.string().optional()
})

const editBodyFileSchema = z.object({
  name: z.string().nonempty()
})

const getFilesQueryParamSchema = z.object({
  name: z.string().optional(),
  ...queryPaginationsSchema
})

const editParamFileSchema = z.object({
  id: z.string().nonempty()
})

const getParamFileSchema = z.object({
  id: z.string().nonempty()
})

const deleteParamFileSchema = z.object({
  id: z.string().nonempty()
})

export type CreateFileInput = z.infer<typeof createBodyFileSchema>
export type EditFileInput = z.infer<typeof editBodyFileSchema>
export type EditFileParam = z.infer<typeof editParamFileSchema>
export type GetFilesQueryParam = z.infer<typeof getFilesQueryParamSchema>
export type GetFileParam = z.infer<typeof getParamFileSchema>
export type DeleteFileParam = z.infer<typeof deleteParamFileSchema>

export const { schemas: fileSchemas, $ref } = buildJsonSchemas(
  {
    createBodyFileSchema,
    editBodyFileSchema,
    editParamFileSchema,
    getFilesQueryParamSchema,
    getParamFileSchema,
    deleteParamFileSchema
  },
  { $id: 'fileSchema' }
)
