import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../utils/modalConMensaje.js';

/**
 * 
 * @param {Event} e 
 * @param {String} captcha
 * @param {String} userInput
 */
export function handleCaptchaSubmit(e, captcha, userInput) {
    e.preventDefault();

    if (captcha !== userInput) {
        return modalConMensaje(ListDeMensajesDispoiblesEnum.CAPTCHA_NO_SUPERADO, ListaDeTiposDeAlertaEnum.ERROR);
    }

    modalConMensaje(ListDeMensajesDispoiblesEnum.CAPTCHA_SUPERADO, ListaDeTiposDeAlertaEnum.SUCCESS);
    setTimeout(() => {
        sessionStorage.setItem('autentication', true);
        window.location.href = '../categories';
    }, 5000);
}