import express, { type Request, type Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('home page')
})

export default router
