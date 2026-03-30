import { GetNivelesResponseSchema } from "../schemas/nivel.schema";
import { NivelesRepositoryPort } from "../ports/niveles.port";
import { getAllNiveles, loadNiveles } from "../repositories/nivel.repository";

export const buildNivelesService = (repo: NivelesRepositoryPort) => {
  return {
    listniveles: async () => {
      const niveles = await repo.getAll();
      return GetNivelesResponseSchema.parse(niveles);
    },
    reloadNiveles: async (): Promise<void> => {
      await repo.reload();
    },
  };
};