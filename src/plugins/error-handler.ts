import { FastifyInstance } from 'fastify'
import { AppError } from '../utils/app-error'
import { ZodError } from 'zod'
import { errorResponse } from '../utils/response'

export const registerErrorHandler = (app: FastifyInstance) => {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send(
          errorResponse(
            'VALIDATION_ERROR',
            'Error de validación',
            error.flatten(),
          ),
        )
    }

    if (error instanceof AppError) {
      return reply
        .status(error.statusCode)
        .send(errorResponse(error.code, error.message, error.details))
    }

    request.log.error(error)

    return reply
      .status(500)
      .send(
        errorResponse('INTERNAL_SERVER_ERROR', 'Error interno del servidor'),
      )
  })
}
