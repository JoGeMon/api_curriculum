import { FastifyReply, FastifyRequest } from 'fastify'
import { buildAsignaturasService } from '../services/asignatura.service'
import { successResponse } from '../utils/http-response'
import { GetAsignaturaByIdParams } from '../schemas/http/asigntatura/get-asignatura-by-id.schema'
import { getAsignaturasETag } from '../datasources/asignatura.data'

type AsignaturaService = ReturnType<typeof buildAsignaturasService>

export const getAsignaturasHandler = (service: AsignaturaService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const etag = getAsignaturasETag()
    const clienteETag = request.headers['if-none-match']

    const normalize = (value?: string) => value?.replace(/"/g, '').trim()
    if (etag && normalize(clienteETag) === normalize(etag)) {
      return reply.status(304).send()
    }

    const asignaturas = await service.getAsignaturas()

    console.log({
      etag,
      clienteETag,
    })

    reply.header('ETag', etag ?? '')
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
