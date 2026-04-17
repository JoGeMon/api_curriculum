import { Curso, CursoData } from '../types/curso.types'
import { generateETag } from '../utils/etag'
import { z } from 'zod'
import { loadCursosFromFiles } from '../datasources/loaders/curso.loader'

import { CursoSchema } from '../schemas/curso.schema'

const CursosSchema = z.array(CursoSchema)

let cache: CursoData[] | null = null
let etag: string | null = null

export const loadCursos = async () => {
  const data = await loadCursosFromFiles()
  cache = data
  etag = generateETag(cache)
}

export const getCursoETag = (): string | null => {
  return etag
}

export const getAllCursos = async (): Promise<Curso[]> => {
  if (!cache) {
    throw new Error('Cursos no cargados')
  }
  return CursosSchema.parse(cache)
}
