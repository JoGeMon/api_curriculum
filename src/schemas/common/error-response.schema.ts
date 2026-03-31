import { z } from 'zod'

export const ErrorDetailsSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
})

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ErrorDetailsSchema,
})
