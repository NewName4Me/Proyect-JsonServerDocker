export class User {

    #token;
    #email;
    #username;

    constructor(email, username) {
        this.#token = Date.now();
        this.#email = email;
        this.#username = username;
    }

    getEmail() { return this.#email; }
    getUsername() { return this.#username; }
    getToken() { return this.#token; }

    setEmail(newEmail) { this.#email = newEmail; }
    setUsername(newUsername) { this.#username = newUsername; }

    toJSON() {
        return {
            email: this.#email,
            username: this.#username,
            token: this.#token
        };
    }
}
