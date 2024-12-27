//#region Imports
import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';
import { MealsRepository } from '../../js/repository/MealsRepository.js';
import { cleanHTMLElement } from '../../js/utils/cleanHTMLElement.js';
import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../../js/utils/modalConMensaje.js';

document.addEventListener('DOMContentLoaded', startApp);

//#region Start App
function startApp() {
    const contenedorDeItems = document.getElementById('contenedorDeItems');
    cleanHTMLElement(contenedorDeItems);
    const carrito = new Carrito().getCarrito();

    loadCarritoItemsInContainer(carrito, contenedorDeItems);
    displayAmountOfItems();

    cargarResumenDeCompra()
}

//#region Load Cariito Items
/**
 * 
 * @param {Array<Object>} carrito 
 * @param {HTMLElement} contenedor 
 */
async function loadCarritoItemsInContainer(carrito, contenedor) {
    const fragment = document.createDocumentFragment();

    for (const [itemKey, itemValue] of carrito) {
        fragment.appendChild(await designItem(itemKey, itemValue));
    }
    contenedor.appendChild(fragment);
}

//#region Design Items
/**
 * 
 * @param {Object} item 
 */
async function designItem(itemKey, itemValue) {
    const itemInfo = await new MealsRepository().getMealById(itemKey);

    const { strMeal, strArea, strCategory, strMealThumb, id, price } = itemInfo;

    const itemContainer = document.createElement('SECTION');

    itemContainer.setAttribute('data-id', id);
    itemContainer.classList.add('bxS-floating');

    const imgContainer = document.createElement('IMG');
    const titleContainer = document.createElement('H2');
    const areaContainer = document.createElement('H3');
    const categoriaContainer = document.createElement('H4');
    const cantidadMasBotonesContainer = document.createElement('DIV');
    const priceContainer = document.createElement('SPAN');
    const cantidadContainer = document.createElement('SPAN');
    const addOneMoreBtn = document.createElement('BUTTON');
    const removeOneMoteBtn = document.createElement('BUTTON');

    imgContainer.src = strMealThumb;
    titleContainer.textContent = strMeal;
    areaContainer.textContent = `Area: ${strArea}`;
    categoriaContainer.textContent = `Category: ${strCategory}`;
    priceContainer.textContent = `${price}$`;
    cantidadContainer.textContent = itemValue;
    cantidadContainer.classList.add('cantidadContainer');
    addOneMoreBtn.textContent = '+';
    removeOneMoteBtn.textContent = '-';
    addOneMoreBtn.classList.add('btn-success');
    removeOneMoteBtn.classList.add('btn-error');

    addOneMoreBtn.addEventListener('click', () => addOneMoreItemToCarrito(itemInfo));
    removeOneMoteBtn.addEventListener('click', () => removeOneItemFromCarrito(itemInfo));

    itemContainer.appendChild(imgContainer);
    itemContainer.appendChild(titleContainer);
    itemContainer.appendChild(areaContainer);
    itemContainer.appendChild(priceContainer);
    itemContainer.appendChild(categoriaContainer);

    cantidadMasBotonesContainer.appendChild(removeOneMoteBtn);
    cantidadMasBotonesContainer.appendChild(cantidadContainer);
    cantidadMasBotonesContainer.appendChild(addOneMoreBtn);

    itemContainer.appendChild(cantidadMasBotonesContainer);

    return itemContainer;
}

//#region Add One More Item
async function addOneMoreItemToCarrito(item) {
    await new Carrito().addItem(item);
    displayAmountOfItems();
    const itemContainer = document.querySelector(`section[data-id="${item.id}"]`);
    const cantidadContainer = itemContainer.querySelector('.cantidadContainer');
    cantidadContainer.textContent = Number(cantidadContainer.textContent) + 1;
    cargarResumenDeCompra(); // Update total
}

async function removeOneItemFromCarrito(item) {
    await new Carrito().removeOneItem(item);
    displayAmountOfItems();
    const itemContainer = document.querySelector(`section[data-id="${item.id}"]`);
    const cantidadContainer = itemContainer.querySelector('.cantidadContainer');
    cantidadContainer.textContent = Number(cantidadContainer.textContent) - 1;

    if (Number(cantidadContainer.textContent) <= 0) {
        eliminarElementoDelDom(item);
    }
    cargarResumenDeCompra(); // Update total
}

//#region Eliminar elemento del DOM
function eliminarElementoDelDom(item) {
    const itemContainer = document.querySelector(`section[data-id="${item.id}"]`);
    if (itemContainer) {
        itemContainer.remove();
        cargarResumenDeCompra();
    }
}

//#region Cargar Resumen Compra
async function cargarResumenDeCompra() {
    const precioTotalContainer = document.getElementById('precioTotal');
    const precioTotalConIvaContainer = document.getElementById('precioTotalConIva');
    const precioCalculado = await new Carrito().getPrecioTotalCarrito();

    precioTotalContainer.textContent = `${precioCalculado} $`;
    precioTotalConIvaContainer.textContent = `${(Number(precioCalculado) * 1.21).toFixed(2)}$`;

}