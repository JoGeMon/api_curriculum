import { FastifyReply, FastifyRequest } from 'fastify'
import { GetCursoByIdParams } from '../schemas/get-curso-by-id.schema'
import { buildCursosService } from '../services/curso.service'
import { successResponse } from '../utils/response'

type CursosService = ReturnType<typeof buildCursosService>

export const getCursosHandler = (service: CursosService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const cursos = await service.listCursos()
    return reply.send(successResponse(cursos))
  }
}

export const reloadCursosHandler = (service: CursosService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await service.reloadCursos()
    return reply.send(successResponse({ status: 'ok' }))
  }
}

export const getCursoByIdHandler = (service: CursosService) => {
  return async (
    request: FastifyRequest<{ Params: GetCursoByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params
    const curso = await service.getCursoById(id)
    return reply.send(successResponse(curso))
  }
}
