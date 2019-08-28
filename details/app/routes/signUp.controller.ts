import { User } from '../entity/user';
import { getRepository } from 'typeorm';
import { Profile } from '../entity/profile';

const signUp = async function (user: Partial<User>, userProfile: Partial<Profile>) {
    try {
        const userRepo = getRepository(User);
        const profileRepo = getRepository(Profile);

        const nUser = new User(user);
        let nUserProfile = new Profile(userProfile);
        nUserProfile = await profileRepo.save(nUserProfile)        
        nUser.profile = nUserProfile;

        return await userRepo.save(nUser);

    } catch(err) {
        console.error(err);
        return undefined;
    }
}

export default signUp;