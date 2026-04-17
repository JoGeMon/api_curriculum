import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { authRoutes } from './routes/auth.routes'
import { cursoRoutes } from './routes/curso.routes'
import { asignaturaRoutes } from './routes/asignatura.routes'

import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { cursoRepository } from './repositories/curso.repository'
import { buildCursosService } from './services/curso.service'
import { asignaturaRepository } from './repositories/asignatura.repository'
import { buildAsignaturasService } from './services/asignatura.service'
import { registerErrorHandler } from './plugins/error-handler'

const cursosService = buildCursosService(cursoRepository)
const asignaturasService = buildAsignaturasService(asignaturaRepository)

export function buildApp() {
  const app = Fastify({
    logger: true,
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  registerErrorHandler(app)

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
  app.register(cursoRoutes, {
    prefix: '/cursos',
    service: cursosService,
  })

  app.register(asignaturaRoutes, {
    prefix: '/asignaturas',
    service: asignaturasService,
  })

  return app
}
