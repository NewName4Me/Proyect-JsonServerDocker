//#region Imports
import { Carrito } from '../entities/Carrito.js';
import { MealsRepository } from '../repository/MealsRepository.js';
import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../utils/modalConMensaje.js';

//#region Handle Email Submit
/**
 *  funcino que toma los datos necesarios del carrito de nuestro usuario para así
 * poder mandarla un correo con la información adecuada
 * @param {Event} e 
 */
export async function handleEmailSubmit(e) {
    e.preventDefault();

    const emailInserted = e.target.children.email.value;
    const userName = JSON.parse(sessionStorage.getItem('currentUser')).username;
    const carrito = new Carrito().getCarrito();
    let carritoUsuarioParseado = '';

    for (const [key, value] of carrito) {
        const data = await new MealsRepository().getMealById(key);
        const { strMeal } = data;

        carritoUsuarioParseado += `+ ${strMeal}: ${value} unidades \n`;
    }


    const precio = await new Carrito().getPrecioTotalCarrito();

    const precioTexto = `${precio} $`;
    const precioTextoConIva = `${(Number(precio) * 1.21).toFixed(2)} $`;;

    const necesaryDataForEmail = { emailInserted, userName, carritoUsuarioParseado, precioTexto, precioTextoConIva };

    sendEmail(necesaryDataForEmail);

    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';
    spinner.style.top = '30%';

    e.target.reset();
}

//#region Send Email
/**
 * dados unos datos envia un email mediante el servicio emailJs mostrando y ocultando un spinner y limpiando 
 * el aspecto del carrito
 * @param {Object} data 
 */
function sendEmail(data = {}) {

    const { emailInserted, userName, carritoUsuarioParseado, precioTexto, precioTextoConIva } = data;

    let params = {
        user_email: emailInserted,
        user_name: userName,
        purchase_summary: carritoUsuarioParseado,
        price: precioTexto,
        price_iva: precioTextoConIva
    }

    emailjs.send('service_41xoude', 'template_ywgv8ad', params)
        .then(function (response) {
            modalConMensaje(ListDeMensajesDispoiblesEnum.EMAIL_ENVIADO_CORRECTAMENTE, ListaDeTiposDeAlertaEnum.SUCCESS);
            document.querySelector('.spinner').style.display = 'none';
            document.querySelector('.modal__facturar__pago').classList.add('hidden');
            new Carrito().cleanCarrito();
            setTimeout(() => {
                location.reload();
            }, 2000);
        }, function (erro) {
            modalConMensaje(ListDeMensajesDispoiblesEnum.ERROR_ENVIO_EMAIL, ListaDeTiposDeAlertaEnum.ERROR);
            document.querySelector('.spinner').style.display = 'none';
            document.querySelector('.modal__facturar__pago').classList.add('hidden');
        });

}