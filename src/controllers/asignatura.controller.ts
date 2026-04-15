import { FastifyReply, FastifyRequest } from 'fastify'
import { buildAsignaturasService } from '../services/asignatura.service'
import { successResponse } from '../utils/response'

type AsignaturaService = ReturnType<typeof buildAsignaturasService>

export const getAsignaturasHandler = (service: AsignaturaService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const asignaturas = await service.getAsignaturas()
    return reply.send(successResponse(asignaturas))
  }
}

export const getAsignaturasByIdHandler = (service: AsignaturaService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { curso_id } = request.params as { curso_id: number }
    const asignaturas = await service.getAsignaturaByCursoId(curso_id)
    console.log('RESPUESTA:', asignaturas)
    return reply.send(asignaturas)
  }
}

export const getAsignaturaByCursoIdHandler = (service: AsignaturaService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { curso_id } = request.params as { curso_id: number }
    const asignaturas = await service.getAsignaturaByCursoId(curso_id)
    console.log('RESPUESTA:', asignaturas)
    return reply.send(asignaturas)
  }
}
