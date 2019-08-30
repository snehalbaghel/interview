import {Request, Response, Router} from 'express';
import passport from 'passport';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { Profile } from '../entity/profile';

const route = Router();

route.get('/profile', async (req: Request, res: Response) => {
    console.log(req.sessionID)
    if(req.isAuthenticated()) {
        try {
            const uid = req.user.id;
            const userRepo = getRepository(User);
        
            const user = await userRepo.findOne({ where: {id: uid}, relations: ["profile"] })

            if(user) {
                delete user.profile.id;
                return res.status(200).json(user.profile)
            }
            
            } catch(err) {
                console.error(err);
                return res.status(500).json({message: 'Unable to find user profile'});
            }
        
    }

    return res.status(401).json({message: 'User is not authenticated'})
    
})

route.post('/profile', async (req: Request, res: Response) => {
    if(req.isAuthenticated()) {
        try {
            const uid = req.user.id;
            const userRepo = getRepository(User);
            const profileRepo = getRepository(Profile)
            const user: User | undefined = await userRepo.findOne( {where: { id: uid }, relations: ["profile"]})
            
            if(!user) {
                throw Error("Unable to find user");
            }

            const pid = user.profile.id;
            await profileRepo.update( pid, req.body )

            return res.status(200).json({ message: 'User profile updated' })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Unable to update profile' })
        }
    }
    return res.status(401).json({ message: 'User is not authenticated'})
})

export default route