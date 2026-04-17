import fs from 'fs/promises'
import path from 'path'
import { AsignaturaData } from '../../types/asignatura.type'

export const loadAsignaturasFromFile = async (): Promise<AsignaturaData[]> => {
  const filePath = path.join(process.cwd(), '../sources/asignatura.json')
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}
