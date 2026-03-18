import {z} from 'zod'

export const NivelSchema = z.object({
    id: z.number(),
    nombre: z.string()
})

export const NivelesResponseSchema = z.array(NivelSchema)