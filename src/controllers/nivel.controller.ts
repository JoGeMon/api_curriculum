import {FastifyReply, FastifyRequest} from 'fastify'
import { listNiveles } from '../services/nivel.service'

export const getNivelesHandler =  async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const niveles = await listNiveles()
    reply.send(niveles)

}