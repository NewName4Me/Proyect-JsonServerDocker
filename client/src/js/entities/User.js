//#region User Class
export class User {
 
    //#region Attributes
    #token;
    #email;
    #username;

    //#region Constructor
    constructor(email, username) {
        this.#token = Date.now();
        this.#email = email;
        this.#username = username;
    }

    //#region GETTERS
    getEmail() { return this.#email; }
    getUsername() { return this.#username; }
    getToken() { return this.#token; }

    //#region SETTERS
    setEmail(newEmail) { this.#email = newEmail; }
    setUsername(newUsername) { this.#username = newUsername; }

    //#region To Json
    /**
     * function que nos devuelve todos los datos de nuestro Usuario
     * @returns {Object}
     */
    toJSON() {
        return {
            email: this.#email,
            username: this.#username,
            token: this.#token
        };
    }
}
