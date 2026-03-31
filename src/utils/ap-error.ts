export class AppError extends Error {
  public code: string
  public statusCode: number
  public details?: unknown

  constructor(
    code: string,
    message: string,
    statusCode = 400,
    details?: unknown,
  ) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.details = details
  }
}
