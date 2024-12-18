import { Carrito } from '../entities/Carrito.js';

export function displayItemsAmountInCarrito() {
    return new Carrito().items.length;
}

export function displayAmountOfItems() {
    const carritoAmountContainer = document.getElementById('itemsAmount');
    carritoAmountContainer.textContent = displayItemsAmountInCarrito();
}