  import Fastify from "fastify"
  import swagger from '@fastify/swagger'
  import swaggerUi from '@fastify/swagger-ui'
  import { authRoutes } from "./routes/auth.routes"
  import { nivelRoutes } from "./routes/nivel.routes"
  import { ZodError } from "zod"
  import { 
    ZodTypeProvider, 
    serializerCompiler, 
    validatorCompiler,
    jsonSchemaTransform
  } from 'fastify-type-provider-zod'

  export function buildApp(){
    const app = Fastify({
      logger: true
    }).withTypeProvider<ZodTypeProvider>();

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.setErrorHandler((error, request, reply) => {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          error: "Validation error",
          issues: error.issues.map( e => ({
            path: e.path,
            message: e.message
          })),
        });
      }
      request.log.error(error);

      return reply.status(500).send({
        error: "Internal Server Error"
      });
    });

    app.register(swagger, {
      openapi: {
        info: {
          title: 'Curriculum API',
          description: 'API pública del curriculum educacional chileno',
          version: '1.0.0'
        },
      },
      transform: jsonSchemaTransform
    });

    app.register(swaggerUi, {
      routePrefix: '/docs',
    });


    //routes
    //app.register(authRoutes, {prefix: "/auth"})
    app.register(nivelRoutes, {prefix: "/niveles"})

    return app
  }