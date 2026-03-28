import fs from 'fs/promises'
import path from 'path'
import { generateETag } from '../utils/etag'
import { Nivel } from '../types/nivel.types'

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
    return nivelesCache
}