import {FastifyReply, FastifyRequest} from 'fastify'
import { listNiveles } from '../services/nivel.service'
import { GetNivelesResponse } from '../schemas/nivel.schema'
import { reloadNiveles } from '../services/nivel.service'

export const getNivelesHandler =  async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const niveles: GetNivelesResponse = await listNiveles()
    return niveles;

}

export const reloadNivelesHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    await reloadNiveles()
    return reply.send({
        status: 'success',
        message: 'Niveles recargados exitosamente'
    })
}