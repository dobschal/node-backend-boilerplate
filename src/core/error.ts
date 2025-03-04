export function throwError (status: number, message: string): never {
  throw new Error(`${status}: ${message}`)
}
