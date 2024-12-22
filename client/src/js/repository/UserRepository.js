import { API_USERS_URI } from '../../../config/env.js';
import { User } from '../entities/User.js';

export class UserRepository {

    #Users_API = API_USERS_URI;

    async getUsers() {
        const data = await fetch(this.#Users_API);
        return await data.json();
    }

    async getUserByEmail(email = '') {
        return (await this.getUsers()).find(u => u.email == email)
    }

    async setUserToSesionWithEmail(email = '') {
        const user = await this.getUserByEmail(email);
        const sessionUser = new User(user.email, user.username);
        sessionStorage.setItem('currentUser', JSON.stringify(sessionUser));
    }
}

