import { z } from 'zod'
import { SuccessResponseSchema } from './common/response.schema'
import { CursoSchema } from './curso.schema'

export const AsignaturaDataSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  id_cursos: z.array(z.number()),
})

export const AsignaturaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  cursos: z.array(CursoSchema),
})

export const GetAsignaturasResponseSchema = SuccessResponseSchema(
  z.array(AsignaturaSchema),
)

export type GetAsignaturasResponse = z.infer<
  typeof GetAsignaturasResponseSchema
>
