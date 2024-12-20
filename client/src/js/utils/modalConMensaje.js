/**
 * 
 * @param {ListDeMensajesDispoiblesEnum} msg 
 * @param {ListaDeTiposDeAlertaEnum} type 
 */
function modalConMensaje(msg, type) {
    const alerta = document.createElement('DIV');
    alerta.classList.add(`alert-${type}`);
    alerta.textContent = msg;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 5000);
}

const ListDeMensajesDispoiblesEnum = Object.freeze({
    ITEM_AGREGADO_AL_CARRITO: 'Agregado al carrito de forma exitosa',
    ITEM_ELIMINADO_DEL_CARRITO: 'Eliminado del carrito de forma exitosa',
    LOGIN_ERRONEO: 'Datos introducidos incorrectos',
    CAPTCHA_NO_SUPERADO: 'Captcha no superado, podrías ser un robot, intentalo de nuevo',
    CAPTCHA_SUPERADO: 'Bienvenido'
});

const ListaDeTiposDeAlertaEnum = Object.freeze({
    SUCCESS: 'SUCCESS',
    INFO: 'INFO',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
});

export { modalConMensaje, ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum };
