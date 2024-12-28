import { Carrito } from '../entities/Carrito.js';
import { MealsRepository } from '../repository/MealsRepository.js';

/**
 * 
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

    e.target.reset();
}

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
            alert('email enviado correctamente')
        }, function (erro) {
            alert('error al enviar el formulario')
        });

}