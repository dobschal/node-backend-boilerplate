import express, { type NextFunction, type Request, type Response } from 'express'
import { expectStringProps } from '../core/typeChecker'
import { database } from '../core/database'
import { type UserModel } from '../types/UserModel'
import { createToken, currentUsername } from '../core/auth'

const router = express.Router()

// TODO: hash password

// TODO: validate email

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    expectStringProps(req.body, ['username', 'password', 'email'])
    const result = await database.query(`
        insert into users (username, password, email)
        values ($1, $2, $3)
        returning *
    `, [req.body.username, req.body.password, req.body.email])
    res.send({
      text: 'Users home page',
      result: result.rows
    })
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    expectStringProps(req.body, ['username', 'password'])
    const result = await database.query<UserModel>('select * from users where username=$1', [req.body.username])
    if (result.rows.length !== 1) throw new Error('401: Unauthorized')
    const user = result.rows[0]
    if (user.password !== req.body.password) throw new Error('401: Unauthorized')
    res.send({
      token: createToken(user.username)
    })
  } catch (e) { next(e) }
})

router.get('/current', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = currentUsername(req)
    const result = await database.query<UserModel>('select * from users where username=$1', [username])
    if (result.rows.length !== 1) throw new Error('404: No user found')
    res.send({
      user: result.rows[0]
    })
  } catch (e) { next(e) }
})

export default router
