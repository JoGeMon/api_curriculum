import { Asignatura } from '../types/asignatura.type'
import { getAllAsignaturas } from '../datasources/asignatura.data'
import { AsignaturaSchema } from '../schemas/asignatura.schema'

export const getAsignaturaByCursoId = async (id: number) => {
  const asignaturas = await getAllAsignaturas()
  const asignatura = asignaturas.find((a) => a.id === id)
  if (!asignatura) {
    throw new Error('Asignatura no encontrada')
  }
  return AsignaturaSchema.parse(asignatura)
}

export const asignaturaRepository: AsignaturasRepository = {
  getAll: async () => {
    return getAllAsignaturas()
  },
  getById: async (id: number) => {
    const asignaturas = await getAllAsignaturas()
    return asignaturas.find((asignatura) => asignatura.id === id) ?? null
  },
  getByCursoId: async (curso_id: number) => {
    const asignaturas = await getAllAsignaturas()
    const asignaturasFiltradas = asignaturas.filter((a) =>
      a.niveles_id.includes(curso_id),
    )
    return asignaturasFiltradas.map((a) => AsignaturaSchema.parse(a))
  },
}

export interface AsignaturasRepository {
  getAll: () => Promise<Asignatura[]>
  getById: (id: number) => Promise<Asignatura | null>
  getByCursoId: (curso_id: number) => Promise<Asignatura[]>
}
