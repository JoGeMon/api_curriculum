import {FastifyReply, FastifyRequest} from 'fastify'
import { GetNivelesResponse } from '../schemas/nivel.schema'


export const getNivelesHandler =  (service: any ) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const niveles: GetNivelesResponse = await service.listNiveles()
        return reply.send(niveles);
    };
};

export const reloadNivelesHandler = (service: any) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        await service.reloadNiveles()
        return reply.send({status: "ok"})
    };
};