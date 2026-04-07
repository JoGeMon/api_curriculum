import { z } from 'zod'
import { SuccessResponseSchema } from './common/response.schema'
import { NivelSchema } from './nivel.schema'

// Params
export const GetNivelByIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

// Response
export const GetNiivelByIdResponseSchema = SuccessResponseSchema(NivelSchema)

export type GetNivelByIdParams = z.infer<typeof GetNivelByIdParamsSchema>
export type GetNivelByIdResponse = z.infer<typeof GetNiivelByIdResponseSchema>
