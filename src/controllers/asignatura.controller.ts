import { FastifyReply, FastifyRequest } from 'fastify'
import { buildAsignaturasService } from '../services/asignatura.service'
import { successResponse } from '../utils/response'
import { GetAsignaturaByIdParams } from '../schemas/get-asignatura-by-id.schema'
import { getAsignaturasETag } from '../repositories/asignatura.repository'

type AsignaturaService = ReturnType<typeof buildAsignaturasService>

export const getAsignaturasHandler = (service: AsignaturaService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const asignaturas = await service.getAsignaturas()
    return reply.send(successResponse(asignaturas))
  }
}

export const getAsignaturasByIdHandler = (service: AsignaturaService) => {
  return async (
    request: FastifyRequest<{ Params: GetAsignaturaByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params

    const etag = getAsignaturasETag()
    const clienteETag = request.headers['if-none-match']

    if (etag && clienteETag === etag) {
      return reply.status(304).send()
    }

    const asignaturas = await service.getAsignaturaById(id)

    if (etag) {
      reply.header('ETag', etag)
    }

    return reply.send(successResponse(asignaturas))
  }
}

export const getAsignaturaByCursoIdHandler = (service: AsignaturaService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { curso_id } = request.params as { curso_id: number }
    const asignaturas = await service.getAsignaturaByCursoId(curso_id)
    return reply.send(successResponse(asignaturas))
  }
}
