import { GetNivelesResponseSchema } from '../schemas/nivel.schema'
import { getAllNiveles, loadNiveles } from '../repositories/nivel.repository'
import { NivelesRepository } from '../repositories/nivel.repository'
import { AppError } from '../utils/ap-error'

export const buildNivelesService = (repo: NivelesRepository) => {
  return {
    listNiveles: async () => {
      const niveles = await repo.getAll()
      return niveles
    },
    reloadNiveles: async (): Promise<void> => {
      await repo.reload()
    },

    getNivelById: async (id: number) => {
      const nivel = await repo.getById(id)

      if (!nivel) {
        throw new AppError(
          'NIVEL_NOT_FOUND',
          `Nivel con id ${id} no encontrado`,
          404,
        )
      }
      return nivel
    },
  }
}
