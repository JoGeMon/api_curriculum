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
* [x] **Validación con Zod 3 integrada en Fastify**
* [x] **fastify-type-provider-zod implementado**
* [x] Lectura desde JSON
* [x] Cache en memoria
* [x] **OpenAPI/Swagger auto-generado**
* [x] **Manejo centralizado de errores Zod**

### 🟡 En progreso

* [ ] Crear schemas para Asignaturas
* [ ] Crear schemas para Objetivos de Aprendizaje
* [ ] Validación de request body con Zod en rutas
* [ ] Expandir rutas CRUD

### 🔵 Próximos pasos

* [ ] Nuevos endpoints:
  * [ ] GET /asignaturas
  * [ ] GET /asignaturas/:id/objetivos
  * [ ] GET /objetivos
* [ ] Versionado de API (/v1, /v2)
* [ ] Tests unitarios e integración
* [ ] CI/CD pipeline
* [ ] Rate limiting
* [ ] Autenticación (ruta `/auth` comentada)

---

## 🎯 Visión del proyecto

Este proyecto busca evolucionar hacia una API completamente tipada y basada en especificación (OpenAPI), permitiendo:

* Generación automática de clientes
* Integración con herramientas de IA
* Escalabilidad y mantenibilidad a largo plazo

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de un proceso de aprendizaje avanzado en backend moderno con Node.js.
