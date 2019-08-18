import { Request, Response, Router, NextFunction } from 'express'
import authRoute from './auth'
import { getRepository } from "typeorm";
import { User } from "../entity/user";

const route: Router = Router()

route.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({ message: "pong" })
})

route.post('/test/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRepo = getRepository(User);
        const nUser = new User();

        nUser.name = req.body.name;
        nUser.username = req.body.username;
        nUser.passwordHash = req.body.password;

        const user = await userRepo.save(nUser);

        res.status(200).json(user);

    } catch(err) {
        console.error(err);
        return next(err);
    }
});

route.use('/auth', authRoute)

export default route