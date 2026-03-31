import { FastifyInstance } from 'fastify'
import { getNivelesHandler } from '../controllers/nivel.controller'
import { GetNivelesResponseSchema } from '../schemas/nivel.schema'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { reloadNivelesHandler } from '../controllers/nivel.controller'
import { z } from 'zod'
import { NivelesRepositoryPort } from '../ports/niveles.port'

export async function nivelRoutes(
  server: FastifyInstance,
  opts: { service: any },
) {
  server.get(
    '/',
    {
      schema: {
        summary: 'Obtener todos los niveles',
        description:
          'Obtiene una lista de todos los niveles del curriculum nacional chileno disponibles en el sistema.',
        tags: ['Niveles'],
        response: {
          200: z.any(),
        },
      },
    },
    getNivelesHandler(opts.service),
  )

  server.post(
    '/reload',
    {
      schema: {
        response: {
          200: z.object({
            status: z.string(),
          }),
        },
      },
    },
    reloadNivelesHandler(opts.service),
  )
}
