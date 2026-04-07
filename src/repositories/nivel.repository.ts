import fs from 'fs/promises'
import path from 'path'
import { generateETag } from '../utils/etag'
import { Nivel } from '../types/nivel.types'
import { NivelSchema } from '../schemas/nivel.schema'
import { z } from 'zod'

const NivelesSchema = z.array(NivelSchema)

let nivelesCache: Nivel[] | null = null
let nivelesETag: string | null = null

export const loadNiveles = async (): Promise<void> => {
  console.log('%c' + process.cwd(), 'color:green')
  const filePath = path.join(process.cwd(), 'src/data/niveles.json')
  const data = await fs.readFile(filePath, 'utf-8')
  nivelesCache = JSON.parse(data)
  nivelesETag = generateETag(nivelesCache)
}

export const getAllNiveles = (): Nivel[] => {
  console.log('%c' + process.cwd(), 'color:green')
  if (!nivelesCache) {
    throw new Error('Niveles no cargados')
  }
  return NivelesSchema.parse(nivelesCache)
}

export const getNivelById = async (id: number): Promise<Nivel | null> => {
  console.log('%c' + process.cwd(), 'color:green')
  const niveles = await getAllNiveles()
  const nivel = niveles.find((n) => n.id === id)
  if (!nivel) {
    return null
  }

  return NivelSchema.parse(nivel)
}

export const nivelRepository: NivelesRepository = {
  getAll: async () => {
    return getAllNiveles()
  },
  getById: async (id: number) => {
    return getNivelById(id)
  },
  reload: async () => {
    await loadNiveles()
  },
}

export interface NivelesRepository {
  getAll: () => Promise<Nivel[]>
  getById: (id: number) => Promise<Nivel | null>
  reload: () => Promise<void>
}
