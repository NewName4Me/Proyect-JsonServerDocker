import { isValidUser } from '../utils/isValidUser.js';

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

    return true;
}