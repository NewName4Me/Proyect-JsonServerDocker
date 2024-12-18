import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';

document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const contenedorDeItems = document.getElementById('contenedorDeItems');
    const carrito = new Carrito().getCarrito();

    loadCarritoItemsInContainer(carrito, contenedorDeItems);
    displayAmountOfItems();
}

/**
 * 
 * @param {Array<Object>} carrito 
 * @param {HTMLElement} contenedor 
 */
function loadCarritoItemsInContainer(carrito, contenedor) {

}