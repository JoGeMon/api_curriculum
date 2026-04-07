import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  getNivelesHandler,
  getNivelByIdHandler,
  reloadNivelesHandler,
} from '../controllers/nivel.controller'

import {
  GetNivelesResponseSchema,
  ReloadResponseSchema,
} from '../schemas/nivel.schema'

import {
  GetNivelByIdParamsSchema,
  GetNiivelByIdResponseSchema,
} from '../schemas/get-nivel-by-id.schema'

import { ErrorResponseSchema } from '../schemas/common/error-response.schema'

import { buildNivelesService } from '../services/nivel.service'

type NivelesService = ReturnType<typeof buildNivelesService>

export async function nivelRoutes(
  server: FastifyInstance,
  opts: { service: NivelesService },
) {
  const app = server.withTypeProvider<ZodTypeProvider>()
  const { service } = opts

  app.get(
    '/',
    {
      schema: {
        summary: 'Obtener todos los niveles',
        description:
          'Obtiene una lista de todos los niveles del curriculum nacional chileno disponibles en el sistema.',
        tags: ['Niveles'],
        response: {
          200: GetNivelesResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    getNivelesHandler(service),
  )

  app.get(
    '/:id',
    {
      schema: {
        summary: 'Obtener nivel por ID',
        description: 'Obtiene un nivel específico por su ID',
        tags: ['Niveles'],
        params: GetNivelByIdParamsSchema,
        response: {
          200: GetNivelByIdParamsSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    getNivelByIdHandler(service),
  )

  app.post(
    '/reload',
    {
      schema: {
        response: {
          200: ReloadResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    reloadNivelesHandler(service),
  )
}
