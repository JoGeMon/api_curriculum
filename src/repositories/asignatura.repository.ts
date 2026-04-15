import fs from 'fs/promises'
import path from 'path'
import { generateETag } from '../utils/etag'
import { Asignatura, AsignaturaData } from '../types/asignatura.type'
import { AsignaturaSchema } from '../schemas/asignatura.schema'
import { Curso } from '../types/curso.types'

import { z } from 'zod'
import { getAllCursos } from './curso.repository'
import { CursoSchema } from '../schemas/curso.schema'

const AsignaturasSchema = z.array(AsignaturaSchema)

let asignaturasCache: AsignaturaData[] = []
let asignaturaETag: string | null = null

export const loadAsignaturas = async () => {
  console.log('%c' + process.cwd(), 'color:green')
  const filePath = path.join(process.cwd(), 'src/data/asignatura.json')
  const data = await fs.readFile(filePath, 'utf-8')
  asignaturasCache = JSON.parse(data)
  asignaturaETag = generateETag(asignaturasCache)
}

export const getAllAsignaturas = async (): Promise<Asignatura[]> => {
  if (!asignaturasCache) {
    throw new Error('Asignaturas no cargadas')
  }

  const cursosDisponibles = await getAllCursos()

  const cursosMap = new Map(cursosDisponibles.map((curso) => [curso.id, curso]))

  const asignaturas = asignaturasCache.map((asignaturaData) => {
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

export const getAsignaturaByNivelId = async (id: number) => {
  const asignaturas = await getAllAsignaturas()
  const asignatura = asignaturas.find((a) => a.id === id)
  if (!asignatura) {
    throw new Error('Asignatura no encontrada')
  }
  return AsignaturaSchema.parse(asignatura)
}

export const asignaturaRepository: AsignaturasRepository = {
  getAll: async () => {
    return getAllAsignaturas()
  },
  getById: async (id: number) => {
    const asignaturas = await getAllAsignaturas()
    const asignatura = asignaturas.find((a) => a.id === id)
    if (!asignatura) {
      throw new Error('Asignatura no encontrada')
    }
    return AsignaturaSchema.parse(asignatura)
  },
  getByCursoId: async (curso_id: number) => {
    const asignaturas = await getAllAsignaturas()
    const asignaturasFiltradas = asignaturas.filter((a) =>
      a.niveles_id.includes(curso_id),
    )
    return asignaturasFiltradas.map((a) => AsignaturaSchema.parse(a))
  },
}

export interface AsignaturasRepository {
  getAll: () => Promise<Asignatura[]>
  getById: (id: number) => Promise<Asignatura>
  getByCursoId: (curso_id: number) => Promise<Asignatura[]>
  reload: () => Promise<void>
}
