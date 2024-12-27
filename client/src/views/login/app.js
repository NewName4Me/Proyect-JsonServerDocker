import { handleLoginFormSubmitController } from '../../js/controllers/loginController.js';
import {
    ListDeMensajesDispoiblesEnum,
    ListaDeTiposDeAlertaEnum,
    modalConMensaje
} from '../../js/utils/modalConMensaje.js';
import { handleCaptchaSubmit } from '../../js/controllers/captchaController.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const $loginForm = document.forms.loginForm;
    const $nextBtn = $loginForm.querySelector('.next-btn');
    const $backBtn = $loginForm.querySelector('.back-btn');
    const $step1 = $loginForm.querySelector('.step-1');
    const $step2 = $loginForm.querySelector('.step-2');

    $nextBtn.addEventListener('click', () => {
        const email = $loginForm.useremail.value;
        if (email) {
            $step1.classList.add('previous');
            $step1.classList.remove('active');
            $step2.classList.add('active');
        }
    });

    $backBtn.addEventListener('click', () => {
        $step2.classList.remove('active');
        $step1.classList.remove('previous');
        $step1.classList.add('active');
    });

    $loginForm.addEventListener('submit', async (e) => {
        const correct = await handleLoginFormSubmitController(e, $loginForm);

        if (!correct) {
            modalConMensaje(ListDeMensajesDispoiblesEnum.LOGIN_ERRONEO, ListaDeTiposDeAlertaEnum.ERROR);
            return;
        }

        mostrarReCaptcha();
    });
}

function mostrarReCaptcha() {
    const captchaContainer = document.createElement('FORM');
    captchaContainer.classList.add('captcha');

    const captchaParagrap = document.createElement('P');
    captchaParagrap.textContent = Math.random().toString(32).substring(0, 6);

    const userInput = document.createElement('INPUT');
    userInput.type = "text";

    const submitInput = document.createElement('INPUT');
    submitInput.type = "submit";

    captchaContainer.appendChild(captchaParagrap);
    captchaContainer.appendChild(userInput);
    captchaContainer.appendChild(submitInput);

    captchaContainer.addEventListener('submit', e => handleCaptchaSubmit(e, captchaParagrap.textContent, userInput.value));

    document.body.appendChild(captchaContainer);
}