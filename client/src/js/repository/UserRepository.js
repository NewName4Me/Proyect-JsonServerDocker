//#region Imports
import { API_USERS_URI } from '../../../config/env.js';
import { User } from '../entities/User.js';

//#region User Rep. Class
export class UserRepository {

    //Attributtes
    #Users_API = API_USERS_URI;

    //#region Get Users
    /**
     * funcion que nos devuelve la lista entera de usuarios en formato JSON
     * @returns {JSON}
     */
    async getUsers() {
        try {
            const data = await fetch(this.#Users_API);
            return await data.json();
        } catch (e) {
            throw new Error('Falño al tomar los usuarios => ' + e)
        }
    }

    /**
     * funcion que dado un email nos devolverá true o false en funcion de si este está en la lista de usuarios o no
     * @param {String} email 
     * @returns {Boolean}
     */
    async getUserByEmail(email = '') {
        try {
            return (await this.getUsers()).find(u => u.email == email)
        } catch (e) {
            throw new Error('Fallo al tomar usuario por email => ' + e);
        }
    }

    //#region Set User Session
    /**
     * establece en la sesion al objeto usuario actual 
     * @param {String} email 
     */
    async setUserToSesionWithEmail(email = '') {
        const user = await this.getUserByEmail(email);
        const sessionUser = new User(user.email, user.username);
        sessionStorage.setItem('currentUser', JSON.stringify(sessionUser));
    }
}

