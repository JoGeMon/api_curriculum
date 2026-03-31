import { FastifyReply, FastifyRequest} from "fastify";
import { loginService } from "../services/auth.services";

interface LoginBody {
    username: string
    password: string
}

export async function loginHandler(
    request: FastifyRequest<{
        Body: LoginBody
    }>,
    reply: FastifyReply
){
    const {username, password} = request.body

    try{
        const result = await loginService({username, password})
        return reply.code(200).send(result)
    }catch(error){
        return reply.code(401).send({error: 'Credenciales inválidas'})
    }
}