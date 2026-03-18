# 📚 Curriculum API Chile

🚧 En construcción

API pública para consultar el currículum educacional chileno de forma estructurada, validada y eficiente.

Este proyecto representa datos del sistema educativo (niveles, asignaturas, objetivos de aprendizaje, etc.) utilizando buenas prácticas modernas de desarrollo backend.
---

## 🚀 Objetivos del proyecto

* Exponer el currículum chileno como API REST
* Trabajar con datos estáticos (JSON) como fuente única de verdad
* Implementar arquitectura por capas (routes, controllers, services, repositories)
* Incorporar validación en runtime con Zod
* Aplicar caching en memoria para mejorar rendimiento
* Evolucionar hacia **Spec Driven Development (OpenAPI-first)**

---

## 🧱 Stack tecnológico

* Node.js
* Fastify
* TypeScript (strict mode)
* Zod (validación de datos)
* JSON como fuente de datos

---

## 📂 Estructura del proyecto

```
src/
  app.ts
  server.ts
  routes/
  controllers/
  services/
  repositories/
  schemas/
  data/
```

---

## 📌 Endpoints actuales

### GET /niveles

Obtiene todos los niveles educacionales.

---

## ⚙️ Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Servidor disponible en:

http://localhost:8080

---

## 🧠 Decisiones técnicas

* Se utiliza **JSON como fuente de datos** debido a que el currículum cambia con baja frecuencia.
* Se implementa una **capa de repository** para desacoplar la fuente de datos.
* Se utiliza **Zod** para validación en runtime y tipado consistente.
* Se incorpora **cache en memoria** para evitar lecturas innecesarias.

---

## 📈 Roadmap

### 🟢 Base del proyecto

* [x] Inicialización con Fastify + TypeScript
* [x] Primera ruta `/niveles`
* [x] Arquitectura por capas
* [x] Validación con Zod
* [x] Lectura desde JSON
* [x] Cache en memoria

### 🟡 En progreso

* [ ] Integración de Zod con Fastify (type provider)
* [ ] Estandarización de respuestas
* [ ] Manejo centralizado de errores

### 🔵 Próximos pasos

* [ ] Generación de OpenAPI (Swagger)
* [ ] Spec Driven Development
* [ ] Nuevos endpoints:

  * [ ] /asignaturas
  * [ ] /objetivos
* [ ] Versionado de API
* [ ] Tests

---

## 🎯 Visión del proyecto

Este proyecto busca evolucionar hacia una API completamente tipada y basada en especificación (OpenAPI), permitiendo:

* Generación automática de clientes
* Integración con herramientas de IA
* Escalabilidad y mantenibilidad a largo plazo

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de un proceso de aprendizaje avanzado en backend moderno con Node.js.
