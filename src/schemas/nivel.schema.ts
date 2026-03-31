import { z } from 'zod'
import { SuccessResponseSchema } from './common/response.schema'

export const NivelSchema = z.object({
  id: z.number(),
  nombre: z.string(),
})

export const GetNivelesResponseSchema = SuccessResponseSchema(
  z.array(NivelSchema),
)

export const ReloadResponseSchema = z.object({
  success: z.literal(true),
})

export type GetNivelesResponse = z.infer<typeof GetNivelesResponseSchema>
