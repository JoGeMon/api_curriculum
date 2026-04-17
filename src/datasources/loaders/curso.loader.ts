import fs from 'fs/promises'
import path from 'path'
import { CursoData } from '../../types/curso.types'

export const loadCursosFromFiles = async (): Promise<CursoData[]> => {
  const filePath = path.join(process.cwd(), '../sources/curso.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}
