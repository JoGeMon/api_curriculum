import { getAllNiveles } from "../repositories/nivel.repository";
import { NivelesResponseSchema } from "../schemas/nivel.schema";

export async function listNiveles(){
    const niveles =  getAllNiveles()
    
    return NivelesResponseSchema.parse(niveles)
}