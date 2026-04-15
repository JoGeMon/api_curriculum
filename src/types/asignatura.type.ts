import { Curso } from './curso.types'

export interface Asignatura {
  id: number
  nombre: string
  cursos: Curso[]
}

export interface AsignaturaData {
  id: number
  nombre: string
  id_cursos: number[]
}
