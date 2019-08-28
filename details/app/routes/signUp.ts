import {Response, Request, Router} from 'express';
import signup from './signUp.controller';

const router: Router = Router();

router.post('',async (req: Request, res: Response) => {
    
    let user = req.body.user;
    const userProfile = req.body.userProfile;
    user = await signup(user, userProfile);
    if(user) {
        req.logIn(user, err => {
            if (err) {
                return res.status(401).json({message: 'Unable to login'}); 
            }
 
            return res.status(200).json({is_authenticated: true, message: 'New profile created'});
        })
    } else {
        return res.status(500).json({message: 'Unable to create profile'});   
    }

    // return res.status(500).json({message: 'Unable to create profile'});

})

export default router;