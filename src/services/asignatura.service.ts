import { AsignaturasRepository } from '../repositories/asignatura.repository'
import { AppError } from '../utils/app-error'

export const buildAsignaturasService = (repo: AsignaturasRepository) => {
  return {
    getAsignaturas: async () => {
      const asignaturas = await repo.getAll()
      if (!asignaturas) {
        throw new AppError(
          'ASIGNATURAS_NOT_FOUND',
          'No se encontraron asignaturas',
          404,
        )
      }
      return asignaturas
    },

    getAsignaturaById: async (id: number) => {
      const asignatura = await repo.getById(id)
      if (!asignatura) {
        throw new AppError(
          'ASIGNATURA_NOT_FOUND',
          `No se encontró la asignatura con id ${id}`,
          404,
        )
      }
      return asignatura
    },

    getAsignaturaByCursoId: async (curso_id: number) => {
      const asignaturas = await repo.getByCursoId(curso_id)

      if (!asignaturas) {
        throw new AppError(
          'ASIGNATURAS_NOT_FOUND',
          `No se encontraron asignaturas para el curso con id ${curso_id}`,
          404,
        )
      }
      return asignaturas
    },
  }
}
