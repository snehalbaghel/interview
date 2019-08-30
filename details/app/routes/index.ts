import { Router } from 'express'
import authRoute from './auth'
import signUpRoute from './signUp';
import userRoute from './user';

const route: Router = Router()

route.use('/signup', signUpRoute);

route.use('/auth', authRoute);

route.use('/user', userRoute);

export default route