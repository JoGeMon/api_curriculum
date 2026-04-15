import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import {
  getCursosHandler,
  getCursoByIdHandler,
  reloadCursosHandler,
} from '../controllers/curso.controller'

import {
  GetCursosResponseSchema,
  ReloadResponseSchema,
} from '../schemas/curso.schema'

import {
  GetCursoByIdParamsSchema,
  GetCursoByIdResponseSchema,
} from '../schemas/get-curso-by-id.schema'

import { ErrorResponseSchema } from '../schemas/common/error-response.schema'

import { buildCursosService } from '../services/curso.service'

type CursosService = ReturnType<typeof buildCursosService>

export async function cursoRoutes(
  server: FastifyInstance,
  opts: { service: CursosService },
) {
  const app = server.withTypeProvider<ZodTypeProvider>()
  const { service } = opts

  app.get(
    '/',
    {
      schema: {
        summary: 'Obtener todos los cursos',
        description:
          'Obtiene una lista de todos los cursos del curriculum nacional chileno disponibles en el sistema.',
        tags: ['Cursos'],
        response: {
          200: GetCursosResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    getCursosHandler(service),
  )

  app.get(
    '/:id',
    {
      schema: {
        summary: 'Obtener curso por ID',
        description: 'Obtiene un curso específico por su ID',
        tags: ['Cursos'],
        params: GetCursoByIdParamsSchema,
        response: {
          200: GetCursoByIdResponseSchema,
          404: ErrorResponseSchema,
          500: ErrorResponseSchema,
        },
      },
    },
    getCursoByIdHandler(service),
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
    reloadCursosHandler(service),
  )
}
