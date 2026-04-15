import fs from 'fs/promises'
import path from 'path'
import { generateETag } from '../utils/etag'
import { Curso } from '../types/curso.types'
import { CursoSchema } from '../schemas/curso.schema'
import { z } from 'zod'

const CursosSchema = z.array(CursoSchema)

let cursosCache: Curso[] | null = null
let cursosETag: string | null = null

export const loadCursos = async (): Promise<void> => {
  console.log('%c' + process.cwd(), 'color:green')
  const filePath = path.join(process.cwd(), 'src/data/cursos.json')
  const data = await fs.readFile(filePath, 'utf-8')
  cursosCache = JSON.parse(data)
  cursosETag = generateETag(cursosCache)
}

export const getAllCursos = (): Curso[] => {
  console.log('%c' + process.cwd(), 'color:green')
  if (!cursosCache) {
    throw new Error('Cursos no cargados')
  }
  return CursosSchema.parse(cursosCache)
}

export const getCursoById = async (id: number): Promise<Curso | null> => {
  console.log('%c' + process.cwd(), 'color:green')
  const cursos = await getAllCursos()
  const curso = cursos.find((c) => c.id === id)
  if (!curso) {
    return null
  }

  return CursoSchema.parse(curso)
}

export const cursoRepository: CursosRepository = {
  getAll: async () => {
    return getAllCursos()
  },
  getById: async (id: number) => {
    return getCursoById(id)
  },
  reload: async () => {
    await loadCursos()
  },
}

export interface CursosRepository {
  getAll: () => Promise<Curso[]>
  getById: (id: number) => Promise<Curso | null>
  reload: () => Promise<void>
}
