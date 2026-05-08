import fs from 'fs'
import path from 'path'

import { CursoData } from '@/types/curso.types'
import { AsignaturaData } from '@/types/asignatura.type'

const cursosPath = path.resolve(
  __dirname,
  '../../datasources/sources/curso.json',
)

console.table(cursosPath)

const asignaturasPath = path.resolve(
  __dirname,
  '../../datasources/sources/asignatura.json',
)

const outputPath = path.resolve(__dirname, '../build/curso-asignatura.json')

export const buildCurriculum = () => {
  const cursos: CursoData[] = JSON.parse(fs.readFileSync(cursosPath, 'utf-8'))

  const asignaturas: AsignaturaData[] = JSON.parse(
    fs.readFileSync(asignaturasPath, 'utf-8'),
  )

  const result = cursos.map((curso) => {
    const asignaturasDelCurso = asignaturas
      .filter((a) => a.id_cursos.includes(curso.id))
      .map((a) => ({
        id: a.id,
        nombre: a.nombre,
      }))

    return {
      id: curso.id,
      nombre: curso.nombre,
      asignaturas: asignaturasDelCurso,
    }
  })

  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))

  console.log('✅ Curriculum build generado')
}

buildCurriculum()
