import { Carrito } from '../entities/Carrito.js';

/**
 * function que usando el repositorio de nuestro carrito toma el numero de objetos que tenemos en total
 * @returns {String}
 */
export function displayItemsAmountInCarrito() {
    return new Carrito().getNumeroDeItems();
}

/**
 * function que meustra en la cabecera el numero de objetos que tenemos en total
 */
export function displayAmountOfItems() {
    const carritoAmountContainer = document.getElementById('itemsAmount');
    carritoAmountContainer.textContent = displayItemsAmountInCarrito();
}