import { buildApp } from "./app"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { loadNiveles } from './repositories/nivel.repository'

const start = async () => {
    await loadNiveles()
    const app = buildApp().withTypeProvider<ZodTypeProvider>()
    try {
        await app.listen({port: 8080})
        console.log('Server running on http://localhost:8080')
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }

}

start()
