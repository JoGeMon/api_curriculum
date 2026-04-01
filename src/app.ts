import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { authRoutes } from './routes/auth.routes'
import { nivelRoutes } from './routes/nivel.routes'
import { ZodError } from 'zod'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { nivelRepository } from './repositories/nivel.repository'
import { buildNivelesService } from './services/nivel.service'
import { AppError } from './utils/ap-error'
import { errorResponse } from './utils/response'

const nivelesService = buildNivelesService(nivelRepository)

export function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

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

  app.register(swagger, {
    openapi: {
      info: {
        title: 'Curriculum API',
        description: 'API pública del curriculum educacional chileno',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(swaggerUi, {
    routePrefix: '/docs',
  })

  //routes
  //app.register(authRoutes, {prefix: "/auth"})
  app.register(nivelRoutes, {
    prefix: '/niveles',
    service: nivelesService,
  })

  return app
}
