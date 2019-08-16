import {Request, Response, Router} from 'express'
import authRoute from './auth'

const route: Router = Router()

route.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" })
})

route.use('/auth', authRoute)

export default route