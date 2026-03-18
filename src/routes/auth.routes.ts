import { FastifyInstance } from 'fastify'
import { loginHandler } from '../controllers/auth.controller'

export async function authRoutes(server: FastifyInstance) {
    server.post(
        '/login',{
            schema: {
                body: {
                    type: 'object',
                    required: ['username', 'password'],
                    additionalProperties: false,
                    properties: {
                        username: { type: 'string', minLength: 3 },
                        password: { type: 'string', minLength: 4 }
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' }    
                        }
                    },
                    401: {
                        type: 'object',
                        properties: {
                            error: { type: 'string' }
                        }
                    }
                }
            }
        },
        loginHandler
    )
}