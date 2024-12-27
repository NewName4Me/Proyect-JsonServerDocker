import { isValidUser } from '../utils/isValidUser.js';
import { UserRepository } from '../repository/UserRepository.js';

/**
 * 
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