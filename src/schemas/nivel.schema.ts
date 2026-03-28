import {z} from 'zod'

export const NivelSchema = z.object({
    id: z.number(),
    nombre: z.string()
})

export const GetNivelesResponseSchema = z.array(NivelSchema)

export type  GetNivelesResponse = z.infer<typeof GetNivelesResponseSchema>