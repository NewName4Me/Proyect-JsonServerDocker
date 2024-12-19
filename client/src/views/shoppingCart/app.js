import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';
import { MealsRepository } from '../../js/repository/MealsRepository.js';

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
async function loadCarritoItemsInContainer(carrito, contenedor) {
    const fragment = document.createDocumentFragment();

    for (const [itemKey, itemValue] of carrito) {
        fragment.appendChild(await designItem(itemKey, itemValue));
    }
    contenedor.appendChild(fragment);
}

/**
 * 
 * @param {Object} item 
 */
async function designItem(itemKey, itemValue) {
    const itemInfo = await new MealsRepository().getMealById(itemKey);

    const { strMeal, strArea, strCategory, strMealThumb, id } = itemInfo;

    const itemContainer = document.createElement('ARTICLE');

    const imgContainer = document.createElement('IMG');
    const titleContainer = document.createElement('H2');
    const areaContainer = document.createElement('H3');
    const categoriaContainer = document.createElement('H4');
    const cantidadContainer = document.createElement('SPAN');

    imgContainer.src = strMealThumb;
    titleContainer.textContent = strMeal;
    areaContainer.textContent = strArea;
    categoriaContainer.textContent = strCategory;
    cantidadContainer.textContent = itemValue;

    itemContainer.appendChild(imgContainer);
    itemContainer.appendChild(titleContainer);
    itemContainer.appendChild(areaContainer);
    itemContainer.appendChild(categoriaContainer);
    itemContainer.appendChild(cantidadContainer);

    return itemContainer;
}