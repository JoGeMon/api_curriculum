export interface CursoAsignatura {
  id: number
  nombre: string
  asignaturas: {
    id: number
    nombre: string
  }[]
}
