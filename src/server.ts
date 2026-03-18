import { buildApp } from "./app"
import { loadNiveles } from './repositories/nivel.repository'

async function start(){
    await loadNiveles()
    const app = buildApp()

    try {
        await app.listen({port: 8080})
        console.log('Server running on http://localhost:8080')
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }

}

start()
