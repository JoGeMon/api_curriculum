import { CursosRepository } from '../repositories/curso.repository'
import { AppError } from '../utils/ap-error'

export const buildCursosService = (repo: CursosRepository) => {
  return {
    listCursos: async () => {
      const cursos = await repo.getAll()
      return cursos
    },
    reloadCursos: async (): Promise<void> => {
      await repo.reload()
    },

    getCursoById: async (id: number) => {
      const curso = await repo.getById(id)

      if (!curso) {
        throw new AppError(
          'CURSO_NOT_FOUND',
          `Curso con id ${id} no encontrado`,
          404,
        )
      }
      return curso
    },
  }
}
