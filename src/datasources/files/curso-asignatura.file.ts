import fs from 'fs'
import path from 'path'

import { CursoAsignatura } from '@/types/curso-asignatura.type'

const filePath = path.resolve(__dirname, '../build/curso-asignatura.json')

export const getCursoAsignatura = (): CursoAsignatura[] => {
  if (!fs.existsSync(filePath)) {
    throw new Error('Build no generado. Ejecuta build:curriculum')
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}
