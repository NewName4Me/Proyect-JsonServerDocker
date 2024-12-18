import { API_USERS_URI } from '../../../config/env.js';

export class UserRepository {

    #Users_API = API_USERS_URI;

    async getUsers() {
        const data = await fetch(this.#Users_API);
        return await data.json();
    }

    async getUserByEmail(email = '') {
        return (await this.getUsers()).find(u => u.email == email)
    }
}
