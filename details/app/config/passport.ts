import passport from "passport";
import passportLocal from "passport-local";
import { getRepository } from "typeorm";
import {User} from "../entity/user";

const LocalStratergy = passportLocal.Strategy;

passport.use(new LocalStratergy(
    async (username, password, done) => {
        try {
            const userRepo = getRepository(User);
            const user: User | undefined = await userRepo.findOne({ where: {username: username} });
            if(user) {
                if(await user.comparePassword(password)) {
                    return done(null, user);
                } 

                return done(null, false, { message: 'Incorrect password' });

            } else return done(null, false, { message: 'Incorrect username' });
        } catch(err) {
            console.error(err);
            return done(err);
        }
    }
))

passport.serializeUser((user: User, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id: string, done) => {
    try {
        const userRepo = getRepository(User);
        const user = await userRepo.findOne(id);
        done(null, user);
    } catch(err) {
        console.error(err);
        done(err);
    }
})