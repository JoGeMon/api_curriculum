import { FastifyInstance } from 'fastify/types/instance'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { GetAsignaturasResponseSchema } from '../schemas/asignatura.schema'
import { getAsignaturasHandler } from '../controllers/asignatura.controller'
import { buildAsignaturasService } from '../services/asignatura.service'

type AsignaturaService = ReturnType<typeof buildAsignaturasService>

export async function asignaturaRoutes(
  server: FastifyInstance,
  opts: { service: AsignaturaService },
) {
  const app = server.withTypeProvider<ZodTypeProvider>()
  const { service } = opts

  app.get(
    '/',
    {
      schema: {
        summary: 'Obtener todas las asignaturas',
        description:
          'Obtiene una lista de todas las asignaturas disponibles del sistema con los cursos a los que ha sido asignada',
        tags: ['Asignaturas'],
        response: {
          200: GetAsignaturasResponseSchema,
        },
      },
    },
    getAsignaturasHandler(service),
  )

  /*
  app.get(
    '/:id',
    {
      schema: {
        summary: 'Obtener un asignauta por ID',
        description:
          'Obtiene los detalles de una asignatura específica por su ID, junto a un listado de todos los cursos asociados.',
        tags: ['Asignaturas'],
        params: any(),
        response: {
          200: GetAsignaturasResponseSchema,
        },
      },
    },
    getAsignaturaByIdHandler(service),
  )

  app.get(
    '/:nivel_id',
    {
      schema: {
        summary: 'Obtener todas las asignaturas de un nivel',
        description:
          'Obtiene una lista de todas las asignaturas asociadas a un nivel específico.',
        tags: ['Asignaturas'],
        params: any(),
        response: {
          200: GeTAsignaturasResponseSchema,
        },
      },
    },
    getAsignaturasByCursoIdHandler(service),
  )
    */
}
