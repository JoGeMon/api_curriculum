import { z } from 'zod'
import { SuccessResponseSchema } from './common/response.schema'
import { AsignaturaSchema } from './asignatura.schema'

// Params
export const GetAsignaturaByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

// Response
export const GetAsignaturaByIdResponseSchema =
  SuccessResponseSchema(AsignaturaSchema)

export type GetAsignaturaByIdParams = z.infer<
  typeof GetAsignaturaByIdParamsSchema
>
export type GetAsignaturaByIdResponse = z.infer<
  typeof GetAsignaturaByIdResponseSchema
>
