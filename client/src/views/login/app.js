import { isValidUser } from '../../js/utils/isValidUser.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const $loginForm = document.forms.loginForm;
    $loginForm.addEventListener('submit', e => handleLoginFormSubmit(e, $loginForm));
}

/**
 * 
 * @param {Event} e 
 * @param {HTMLElement} form 
 */
async function handleLoginFormSubmit(e, form) {
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

