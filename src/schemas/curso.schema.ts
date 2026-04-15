import { z } from 'zod'
import { SuccessResponseSchema } from './common/response.schema'

export const CursoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
})

export const GetCursosResponseSchema = SuccessResponseSchema(
  z.array(CursoSchema),
)

export const ReloadResponseSchema = z.object({
  success: z.literal(true),
})

export type GetCursosResponse = z.infer<typeof GetCursosResponseSchema>
