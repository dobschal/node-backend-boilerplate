import jwt from 'jsonwebtoken'
import { type Request } from 'express'

export interface JwtBody {
  user: string
}
export function createToken (username: string): string {
  return jwt.sign({ user: username }, process.env.JWT_SECRET as string)
}

export function verifyToken (token: string): JwtBody {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtBody
}

export interface AuthorizedRequest extends Request {
  username: string
}

/**
 * Get the current username if a user exists. Else throw an error.
 * @throws {Error}
 */
export function currentUsername (req: Request): string {
  try {
    const tokenHeader = req.header('authorization') ?? ''
    const token = tokenHeader.substring(7, tokenHeader.length)
    const { user } = verifyToken(token)
    return user
  } catch (e) {
    console.error('🔑[auth] Wrong JWT: ', e)
    throw new Error('401: Unauthorized')
  }
}
