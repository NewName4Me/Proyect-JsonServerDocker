import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../utils/modalConMensaje.js';

/**
 * funcino que comprueba si la respuesta del usuario al captcha coincide con la correcta 
 * si es incorrecta muestra un errror, si es correcta muestra un mensaje y a los 5 segundos nos redirije a la página 
 * siguiente
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