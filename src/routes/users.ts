import User from '../models/User'
import { type InferCreationAttributes } from 'sequelize'
import { hasProps } from '@dobschal/type-checker'
import hash from '../core/hash'
import { createToken, currentUserId } from '../core/jwt'
import { type Request } from 'express'

export const prefix = '/users'

export async function getCurrent (_: unknown, req: Request): Promise<User | null> {
  const userId = currentUserId(req)
  if (userId == null) {
    throw new Error('401:Unauthorized')
  }
  return await User.findByPk(userId)
}

// TODO: Verify email

export async function postRegister (user: InferCreationAttributes<User>): Promise<User> {
  hasProps(user, {
    password: String,
    email: String
  })
  return await User.create({
    email: user.email,
    password: hash(user.password)
  })
}

export async function postLogin (body: InferCreationAttributes<User>): Promise<{ token: string }> {
  const user = await User.findOne({ where: { email: body.email } })
  if (user == null) {
    throw new Error('401:User not found')
  }
  if (user.password !== hash(body.password)) {
    throw new Error('401:Wrong password')
  }
  return {
    token: createToken(user.id)
  }
}
