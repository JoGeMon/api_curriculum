import { FastifyReply, FastifyRequest } from 'fastify'
import { GetNivelesResponse } from '../schemas/nivel.schema'
import { GetNivelByIdParams } from '../schemas/get-nivel-by-id.schema'
import { buildNivelesService } from '../services/nivel.service'
import { successResponse } from '../utils/response'

type NivelesService = ReturnType<typeof buildNivelesService>

export const getNivelesHandler = (service: NivelesService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const niveles = await service.listNiveles()
    console.log('RESPUESTA:', niveles)
    return reply.send(successResponse(niveles))
  }
}

export const reloadNivelesHandler = (service: NivelesService) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await service.reloadNiveles()
    return reply.send(successResponse({ status: 'ok' }))
  }
}

export const getNivelByIdHandler = (service: NivelesService) => {
  return async (
    request: FastifyRequest<{ Params: GetNivelByIdParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params
    const nivel = await service.getNivelById(id)
    return reply.send(successResponse(nivel))
  }
}
