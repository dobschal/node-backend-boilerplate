import express, { type NextFunction, type Request, type Response } from 'express'
import { expectStringProps } from '../core/typeChecker'
import { database } from '../core/database'

const router = express.Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
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

export default router
