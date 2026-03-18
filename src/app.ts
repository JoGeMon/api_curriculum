import Fastify from "fastify"
import { authRoutes } from "./routes/auth.routes"
import { nivelRoutes } from "./routes/nivel.routes"

export function buildApp(){
  const app = Fastify({
    logger: true
  })

  app.register(authRoutes, {prefix: "/auth"})
  app.register(nivelRoutes, {prefix: "/niveles"})

  return app
}