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

const nivelesService = buildNivelesService(nivelRepository)

export function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Error de validación',
          details: error.flatten(),
        },
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      })
    }

    request.log.error(error)

    return reply.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error interno del servidor',
      },
    })
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
