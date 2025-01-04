//#region Imports
import { isValidUser } from '../utils/isValidUser.js';
import { UserRepository } from '../repository/UserRepository.js';

//#region Handle Login Submit
/**
 *  funcion que comprueba si el usuario introducido en el login existe 
 * si es así lo agrega a la sesion mediante el repositorio
 * @param {Event} e 
 * @param {HTMLElement} form 
 */
export async function handleLoginFormSubmitController(e, form) {
    e.preventDefault();

    const emailInput = form.useremail.value;
    const passwordInput = form.userpassword.value;

    if (!(await isValidUser(emailInput, passwordInput))) {
        return false
    }

    form.reset();

    new UserRepository().setUserToSesionWithEmail(emailInput);

    return true;
}