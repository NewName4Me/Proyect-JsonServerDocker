import { handleLoginFormSubmitController } from '../../js/controllers/loginController.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const $loginForm = document.forms.loginForm;
    $loginForm.addEventListener('submit', e => handleLoginFormSubmitController(e, $loginForm));
}