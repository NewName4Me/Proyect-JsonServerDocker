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
        alert('Usuario invalido');
        return;
    }

    window.location.href = '../categories/';

    form.reset();
}