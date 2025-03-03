import jwt from 'jsonwebtoken'
import { type Request } from 'express'
import { isNumber } from '@dobschal/type-checker'

export interface JwtBody {
  userId: string
}

export function createToken (userId: number): string {
  if (process.env.JWT_SECRET == null) {
    throw new Error('JWT_SECRET is not defined')
  }
  return jwt.sign({ userId }, process.env.JWT_SECRET)
}

export function verifyToken (token: string): JwtBody {
  if (process.env.JWT_SECRET == null) {
    throw new Error('JWT_SECRET is not defined')
  }
  const body = jwt.verify(token, process.env.JWT_SECRET) as JwtBody
  isNumber(body.userId)
  return body
}

export function currentUserId (req: Request): string {
  try {
    const tokenHeader = req.header('authorization') ?? ''
    const token = tokenHeader.substring(7, tokenHeader.length)
    return verifyToken(token).userId
  } catch (e) {
    console.error('🔑[auth] Wrong JWT: ', e)
    throw new Error('401: Unauthorized')
  }
}
