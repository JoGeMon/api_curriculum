import { GetNivelesResponseSchema } from '../schemas/nivel.schema'
import { NivelesRepositoryPort } from '../ports/niveles.port'
import { getAllNiveles, loadNiveles } from '../repositories/nivel.repository'
import { AppError } from '../utils/ap-error'

export const buildNivelesService = (repo: NivelesRepositoryPort) => {
  return {
    listNiveles: async () => {
      const niveles = await repo.getAll()
      return niveles
    },
    reloadNiveles: async (): Promise<void> => {
      await repo.reload()
    },

    listNivelById: async (id: number) => {
      const niveles = await repo.getAll()
      const nivel = niveles.find((n) => n.id === id)
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
