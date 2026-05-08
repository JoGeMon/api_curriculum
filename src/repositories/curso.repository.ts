import { CursoAsignatura } from '../types/curso-asignatura.type'
import { CursoSchema } from '../schemas/models/curso.schema'
import { getCursoAsignatura } from '../datasources/files/curso-asignatura.file'

export const getCursoById = async (
  id: number,
): Promise<CursoAsignatura | null> => {
  const cursos = await getCursoAsignatura()
  const curso = cursos.find((c) => c.id === id)
  if (!curso) {
    throw new Error('Asignatura no encontrada')
  }
  return CursoSchema.parse(curso)
}

export const cursoRepository: CursosRepository = {
  getAll: async () => {
    //return getAllCursos()
    return getCursoAsignatura()
  },
  getById: async (id: number) => {
    return getCursoById(id)
  },
  reload: async () => {
    //    await loadCursos()//
  },
}

export interface CursosRepository {
  getAll: () => Promise<CursoAsignatura[]>
  getById: (id: number) => Promise<CursoAsignatura | null>
  reload: () => Promise<void>
}
