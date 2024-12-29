import { User } from '../src/js/entities/User.js';

describe('Test de mi usuario', () => {
    let user;

    beforeEach(() => {
        user = new User('pepito@gmail.com', 'Pepito');
    });

    it('Deberia tener un metodo para obtener el email', () => {
        expect(user.getEmail()).toEqual('pepito@gmail.com');
    });

    it('Deberia tener un metodo para obtener el nombre de usuario', () => {
        expect(user.getUsername()).toEqual('Pepito');
    });

    it('Deberia tener un metodo para obtener el token', () => {
        expect(typeof user.getToken()).toEqual('number');
    });
});

