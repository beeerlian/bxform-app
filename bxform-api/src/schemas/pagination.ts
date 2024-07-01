import { z } from 'zod'

export const queryPaginationsSchema = {
  limit: z.number().optional(),
  page: z.number().optional(),
  sort: z.string().optional()
}

export const flipQueryPaginationsSchema = {
  pagination: z.number().optional(),
  page: z.number().optional(),
  sort_type: z.enum(['sort_desc', 'sort_asc']).optional()
}
