import { Asignatura, AsignaturaData } from '../types/asignatura.type'
import { generateETag } from '../utils/etag'
import { z } from 'zod'

import { AsignaturaSchema } from '../schemas/asignatura.schema'
import { CursoSchema } from '../schemas/curso.schema'

import { loadAsignaturasFromFile } from './loaders/asignatura.loader'

import { getAllCursos } from './curso.data'

let cache: AsignaturaData[] | null = null
let etag: string | null = null

const AsignaturasSchema = z.array(AsignaturaSchema)

export const loadAsignaturas = async () => {
  const data = await loadAsignaturasFromFile()
  cache = data
  etag = generateETag(cache)
}

export const getAsignaturasETag = (): string | null => {
  return etag
}

export const getAllAsignaturas = async (): Promise<Asignatura[]> => {
  if (!cache) {
    throw new Error('Asignaturas no cargadas')
  }

  const cursosDisponibles = await getAllCursos()

  const cursosMap = new Map(cursosDisponibles.map((curso) => [curso.id, curso]))

  const asignaturas = cache.map((asignaturaData) => {
    const cursos = asignaturaData.id_cursos.map((cursoId) => {
      const curso = cursosMap.get(cursoId)
      if (!curso) {
        throw new Error(
          `Curso con id ${cursoId} no encontrado para asignatura ${asignaturaData.nombre}`,
        )
      }
      return CursoSchema.parse(curso)
    })

    return {
      id: asignaturaData.id,
      nombre: asignaturaData.nombre,
      cursos,
    }
  })

  return AsignaturasSchema.parse(asignaturas)
}
