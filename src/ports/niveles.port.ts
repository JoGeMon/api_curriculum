export interface NivelesRepositoryPort {
  getAll(): Promise<{ id: number; nombre: string }[]>
  reload(): Promise<void>
}