import { handleLoginFormSubmitController } from '../../js/controllers/loginController.js';
import {
    ListDeMensajesDispoiblesEnum,
    ListaDeTiposDeAlertaEnum,
    modalConMensaje
} from '../../js/utils/modalConMensaje.js';
import { handleCaptchaSubmit } from '../../js/controllers/captchaController.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'none';

    const $loginForm = document.forms.loginForm;
    const $nextBtn = $loginForm.querySelector('.next-btn');
    const $backBtn = $loginForm.querySelector('.back-btn');
    const $step1 = $loginForm.querySelector('.step-1');
    const $step2 = $loginForm.querySelector('.step-2');

    $nextBtn.addEventListener('click', () => {
        const email = $loginForm.useremail.value;
        if (email) {
            $step1.classList.add('previous');
            $step1.classList.remove('active', 'next');
            $step2.classList.add('active');
            $step2.classList.remove('previous', 'next');
        } else {
            modalConMensaje(ListDeMensajesDispoiblesEnum.EMAIL_NO_RELLENADO, ListaDeTiposDeAlertaEnum.WARNING);
        }
    });

    $backBtn.addEventListener('click', () => {
        $step2.classList.add('next');
        $step2.classList.remove('active', 'previous');
        $step1.classList.add('active');
        $step1.classList.remove('previous', 'next');
    });

    // Inicializar el estado de los pasos
    $step2.classList.add('next');

    $loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        document.querySelector('.spinner').style.display = 'block';

        try {
            const correct = await handleLoginFormSubmitController(e, $loginForm);
            document.querySelector('.spinner').style.display = 'none';

            if (!correct) {
                modalConMensaje(ListDeMensajesDispoiblesEnum.LOGIN_ERRONEO, ListaDeTiposDeAlertaEnum.ERROR);
                return;
            }

            mostrarReCaptcha();
        } catch (error) {
            document.querySelector('.spinner').style.display = 'none';
            modalConMensaje(ListDeMensajesDispoiblesEnum.LOGIN_ERRONEO, ListaDeTiposDeAlertaEnum.ERROR);
        }
    });
}

function mostrarReCaptcha() {
    const captchaContainer = document.createElement('form');
    captchaContainer.classList.add('captcha');

    const captchaWrapper = document.createElement('div');
    captchaWrapper.classList.add('captcha-wrapper');

    const captchaParagraph = document.createElement('span');
    captchaParagraph.classList.add('captcha-text');
    captchaParagraph.textContent = Math.random().toString(32).substring(2, 8).toUpperCase();

    const userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Enter CAPTCHA';
    userInput.classList.add('captcha-input');

    const refreshButton = document.createElement('button');
    refreshButton.type = 'button';
    refreshButton.classList.add('captcha-refresh');
    refreshButton.textContent = '↻';

    refreshButton.addEventListener('click', () => {
        captchaParagraph.textContent = Math.random().toString(32).substring(2, 8).toUpperCase();
    });

    const submitInput = document.createElement('input');
    submitInput.type = 'submit';
    submitInput.value = 'Verify';
    submitInput.classList.add('captcha-submit');

    captchaWrapper.appendChild(captchaParagraph);
    captchaWrapper.appendChild(refreshButton);
    captchaContainer.appendChild(captchaWrapper);
    captchaContainer.appendChild(userInput);
    captchaContainer.appendChild(submitInput);

    captchaContainer.addEventListener('submit', e => handleCaptchaSubmit(e, captchaParagraph.textContent, userInput.value));

    document.querySelector('main').before(captchaContainer);
}
