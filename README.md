# 📚 Curriculum API Chile

🚧 En construcción

API pública para consultar el currículum educacional chileno de forma estructurada, validada y eficiente.

Este proyecto representa datos del sistema educativo (niveles, asignaturas, objetivos de aprendizaje, etc.) utilizando buenas prácticas modernas de desarrollo backend.

---

## 🚀 Objetivos del proyecto

- Exponer el currículum chileno como API REST
- Modelar correctamente entidades y relaciones del dominio educativo
- Utilizar PostgreSQL como fuente de verdad
- Generar artefactos JSON optimizados mediante **build step**
- Implementar arquitectura por capas
- Incorporar validación en runtime con Zod
- Evolucionar hacia **Spec Driven Development (OpenAPI-first)**

---

## 🧱 Stack tecnológico

- Node.js
- Fastify
- TypeScript (strict mode)
- Zod (validación de datos)
- PostgreSQL (fuente de verdad)
- JSON (artefactos generados para lectura optimizada)

---

## 🧠 Modelo de datos (visión general)

El sistema modela el currículum como entidades relacionadas:

- cursos (niveles educativos)
- asignaturas
- objetivos de aprendizaje (OA)
- modalidad (regular, EPJA)
- nivel educativo (básica, media, etc.)
- tipo de formación (científico-humanista, técnico-profesional)

Las relaciones son explícitas (ej: `curso_asignatura`), evitando estructuras acopladas en JSON.

---

## ⚙️ Arquitectura

```
src/
  app.ts
  server.ts

  routes/
  controllers/
  services/
  repositories/

  datasources/
    db/           → PostgreSQL (source of truth)
    builder/      → generación de vistas/read models desde sources o DB
    build/        → artefactos generados por builders (JSON materializados)
    files/        → lectura de artefactos generados desde build/

  schemas/
    common/       → contratos reutilizables comunes (response, error, etc.)
    models/       → modelos reutilizables/runtime contracts (curso, asignatura, curso-asignatura, etc.)
    http/         → contratos HTTP específicos por endpoint
      cursos/
      asignaturas/
      niveles/

  types/
    http/         → tipos TypeScript auxiliarespara ergonomía compile-time

  utils/          → utilidades compartidas del proyecto
```

---

## 🔄 Flujo de datos (clave del sistema)

```
PostgreSQL
   ↓
Builder (script Node.js)
   ↓
JSON generado (versionado)
   ↓
API (Fastify sirve archivos)
```

👉 La API **no construye datos en runtime**, solo sirve datos precomputados.

---

## ⚡ Build Step (concepto clave)

Se implementa un proceso de build que:

- consulta la base de datos
- transforma los datos a una estructura optimizada
- genera archivos JSON versionados

Ejemplo:

```
/data/curriculum/2019/regular/basica.json
```

### Estrategia

- 🟢 Desarrollo → build manual (`npm run build:curriculum`)
- 🔵 Producción → build automático en deploy

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

- PostgreSQL como fuente de verdad para mantener integridad relacional
- JSON como artefacto optimizado para lectura (build step)
- Separación clara entre:
  - escritura (DB)
  - lectura (JSON generado)

- Uso de Zod como fuente única de validación
- Arquitectura desacoplada por capas
- Preparación para versionado de currículum

---

## 📈 Roadmap

### 🟢 Base del proyecto

- [x] Inicialización con Fastify + TypeScript
- [x] Primera ruta `/niveles`
- [x] Arquitectura por capas
- [x] Validación con Zod
- [x] Swagger auto-generado
- [x] Manejo centralizado de errores

### 🟡 En progreso

- [ ] Rediseño modelo curso ↔ asignatura
- [ ] Migración progresiva a PostgreSQL
- [ ] Implementación de builder inicial
- [ ] Generación de JSON estructurado
- [ ] Adaptación de endpoints a lectura desde archivos

### 🔵 Próximos pasos

- [ ] Objetivos de aprendizaje (OA)
- [ ] Versionado de currículum
- [ ] Tests unitarios e integración
- [ ] CI/CD pipeline
- [ ] Rate limiting
- [ ] Autenticación

---

## 🎯 Visión del proyecto

Este proyecto busca evolucionar hacia una API completamente tipada y basada en especificación (OpenAPI), permitiendo:

- Generación automática de clientes
- Integración con herramientas de IA
- Alta performance mediante datos precomputados
- Escalabilidad y mantenibilidad a largo plazo

---

## 👨‍💻 Autor

Proyecto desarrollado como parte de un proceso de aprendizaje avanzado en backend moderno con Node.js.
