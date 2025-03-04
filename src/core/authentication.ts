import jwt from 'jsonwebtoken'
import { type Request } from 'express'

export interface JwtBody {
  userId: number
}

function isJwtBody (body: any): body is JwtBody {
  return typeof body.userId === 'number'
}

export function createToken (tokenBody: JwtBody): string {
  if (process.env.JWT_SECRET == null) {
    throw new Error('Fatal: JWT_SECRET is not defined')
  }
  return jwt.sign(tokenBody, process.env.JWT_SECRET)
}

export function verifyToken (token: string): JwtBody {
  if (process.env.JWT_SECRET == null) {
    throw new Error('Fatal: JWT_SECRET is not defined')
  }
  const tokenBody = jwt.verify(token, process.env.JWT_SECRET)
  if (!isJwtBody(tokenBody)) {
    throw new Error('401: Unauthorized')
  }
  return tokenBody
}

export function authenticate (req: Request): JwtBody {
  try {
    const tokenHeader = req.header('authorization') ?? ''
    const token = tokenHeader.substring(7, tokenHeader.length)
    return verifyToken(token)
  } catch (e) {
    console.error('🔑[auth] Wrong JWT: ', e)
    throw new Error('401: Unauthorized')
  }
}
