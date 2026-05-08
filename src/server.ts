import { buildApp } from './app'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loadCursos } from './datasources/curso.data'
import { loadAsignaturas } from './datasources/asignatura.data'

const start = async () => {
  await loadCursos()
  await loadAsignaturas()
  const app = buildApp().withTypeProvider<ZodTypeProvider>()
  try {
    await app.listen({ port: 8080 })
    console.log('Server running on http://localhost:8080')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
