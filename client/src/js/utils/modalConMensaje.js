/**
 * funcion que dado un posible mensaje de nuestra lista, y el tipo de mensaje muestra una alerta al usuario por un 
 * tiempo predeterminado
 * @param {ListDeMensajesDispoiblesEnum} msg 
 * @param {ListaDeTiposDeAlertaEnum} type 
 * @param {Number} timeDisplayed
 */
function modalConMensaje(msg, type, timeDisplayed = 5000) {
    const alerta = document.createElement('DIV');
    alerta.classList.add(`alert-${type}`);
    alerta.textContent = msg;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), timeDisplayed);
}

const ListDeMensajesDispoiblesEnum = Object.freeze({
    ITEM_AGREGADO_AL_CARRITO: 'Agregado al carrito de forma exitosa',
    ITEM_ELIMINADO_DEL_CARRITO: 'Eliminado del carrito de forma exitosa',
    LOGIN_ERRONEO: 'Datos introducidos incorrectos',
    CAPTCHA_NO_SUPERADO: 'Captcha no superado, podrías ser un robot, intentalo de nuevo',
    CAPTCHA_SUPERADO: 'Bienvenido',
    EMAIL_NO_RELLENADO: 'El email es obligatorio',
    EMAIL_ENVIADO_CORRECTAMENTE: 'Email enviado correctamente, revisa tu correo y gracias',
    ERROR_ENVIO_EMAIL: 'Hubo un problema a la hora de enviar el email, pruebe de nuevo',
    ERROR_PROBLEMA_PARA_AGREGAR_ITEM: 'Problema para agregar este item al carrito'
});

const ListaDeTiposDeAlertaEnum = Object.freeze({
    SUCCESS: 'SUCCESS',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
});

export { modalConMensaje, ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum };
