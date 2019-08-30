import {NextFunction, Request, Response, Router} from 'express';
import passport from "passport";
import { User } from "../entity/user"
import { IVerifyOptions } from "passport-local";
import { OAuth2Client, VerifyIdTokenOptions } from 'google-auth-library';
import { G_CLIENT_ID } from '../config/openid';
import { getRepository } from 'typeorm';
import signUp from './signUp.controller';

const route: Router = Router()

route.get('/isAuthenticated', (req: Request, res:Response) => {
    return res.status(200).json({is_authenticated: req.isAuthenticated()})
})

route.post('/login', 
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.sessionID)
        passport.authenticate("local", (err, user: User, info: IVerifyOptions) => {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.status(200).json({is_authenticated: false, ...info})
            }

            req.login(user, function (err) {
                if(err) return next(err);

                return res.status(200).json({is_authenticated: true, ...info});
            });
        })(req, res, next);
});

route.post('/logout',(req: Request, res: Response, next: NextFunction) => {
    console.log(req.isAuthenticated())
    // if(req.isAuthenticated()) {
        // req.logout();
    // }
    console.log(req.sessionID.toString() + "cool")
    req.logOut()
    if(req.session)
    req.session.destroy(function (err) {
        return res.status(200).json({is_authenticated: false, message: 'User logged out'});
    });
});

route.post('/verify/google', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new OAuth2Client(G_CLIENT_ID);
        const options: VerifyIdTokenOptions = {
            idToken: req.body.id_token,
            audience: G_CLIENT_ID,
        }
        const ticket = await client.verifyIdToken(options);
        
        const payload = ticket.getPayload();
        
        if(!payload)
            throw Error('Unable to fetch payload')
        
        const userRepo = getRepository(User);
        let user: User | undefined = await userRepo.findOne({ where: {email: payload.email} });

        const newUser = {
            name: payload.name,
            email: payload.email,
        }
        const newUserProfile = {
            familyName: payload.family_name,
            givenName: payload.given_name
        }

        if(!user) {  
            user = await signUp(newUser, newUserProfile);
        }
           
        req.login(user, err => {
            if(err) throw err;

            return res.status(200).json({is_authenticated: true});
        })        
    
    } catch (err) {
        console.error(err);
        return res.status(200).json({is_authenticated: false, message: 'Invalid token'});
    }
})

export default route