import { getAllNiveles } from "../repositories/nivel.repository";
import { GetNivelesResponseSchema } from "../schemas/nivel.schema";
import { loadNiveles } from "../repositories/nivel.repository";

export async function listNiveles(){
    const niveles =  getAllNiveles()
    return GetNivelesResponseSchema.parse(niveles)
}

export const reloadNiveles = async (): Promise<void> => {
  await loadNiveles();
};