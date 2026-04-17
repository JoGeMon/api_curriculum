import { Curso } from '../types/curso.types'
import { CursoSchema } from '../schemas/curso.schema'
import { getAllCursos } from '../datasources/curso.data'

export const getCursoById = async (id: number): Promise<Curso | null> => {
  const cursos = await getAllCursos()
  const curso = cursos.find((c) => c.id === id)
  if (!curso) {
    throw new Error('Asignatura no encontrada')
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
