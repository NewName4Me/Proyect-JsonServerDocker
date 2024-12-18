import { UserRepository } from '../repository/UserRepository.js';

/**
 * funcion que toma el usuario que corresponda con el email insertado en el 
 * formulario, y nos devuelve true o false, en funcion de si este se encuentra en 
 * nuestra base de datos o no.
 * Tambien corrobora a su vez si la contraseña introducida corresponda con la almacenada
 * en la base de datos
 * @param {Email} email 
 * @param {Password} pass
 * @returns {Boolean} 
 */
export async function isValidUser(email = '', pass = '') {
    const getUserByEmail = await new UserRepository().getUserByEmail(email) || null;

    return getUserByEmail ? getUserByEmail.password == pass : false;
}