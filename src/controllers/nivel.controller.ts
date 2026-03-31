import { FastifyReply, FastifyRequest } from 'fastify'
import { GetNivelesResponse } from '../schemas/nivel.schema'

export const getNivelesHandler = (service: any) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const niveles = await service.listNiveles()
    console.log('RESPUESTA:', niveles)
    return reply.send({
      success: true,
      data: niveles,
    })
  }
}

export const reloadNivelesHandler = (service: any) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await service.reloadNiveles()
    return reply.send({ status: 'ok' })
  }
}
