import {NextFunction, Request, Response, Router} from 'express';
import passport from "passport";
import {User} from "../entity/user"
import { IVerifyOptions } from "passport-local";

const route: Router = Router()

route.post('/login', 
    (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate("local", (err, user: User, info: IVerifyOptions) => {
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.status(401).json(info)
            }

            req.login(user, (err) => {
                if(err) return next(err);

                return res.status(200).json(user);
            });
        });
});

route.post('/logout',(req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) {
        req.logout();
    }
    return res.status(200);
});

export default route