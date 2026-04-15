import { z } from 'zod'
import { SuccessResponseSchema } from './common/response.schema'
import { CursoSchema } from './curso.schema'

// Params
export const GetCursoByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

// Response
export const GetCursoByIdResponseSchema = SuccessResponseSchema(CursoSchema)

export type GetCursoByIdParams = z.infer<typeof GetCursoByIdParamsSchema>
export type GetCursoByIdResponse = z.infer<typeof GetCursoByIdResponseSchema>
