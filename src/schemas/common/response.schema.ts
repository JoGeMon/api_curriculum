import { z } from 'zod'

export const SuccessResponseSchema = <DataSchema extends z.ZodTypeAny>(
  dataSchema: DataSchema,
) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
  })
