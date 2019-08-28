import {Request, Response, Router} from 'express';
import passport from 'passport';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';

const route = Router();

route.get('/profile', async (req: Request, res: Response) => {
    console.log(req.sessionID)
    if(req.isAuthenticated()) {
        const uid = req.user.id;
        const userRepo = getRepository(User);
        
        const user = await userRepo.findOne({ where: {id: uid}, relations: ["profile"] })

        if(user) {
            console.log(user.profile)
            return res.status(200).json(user.profile)
        }

        return res.status(500).json({message: 'Unable to find user profile'});

    }

    return res.status(401).json({message: 'User is not authorized'})
    
})

export default route