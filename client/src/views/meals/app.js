//#region Imports
import { MealsRepository } from '../../js/repository/MealsRepository.js';
import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';
import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../../js/utils/modalConMensaje.js';
import { cleanHTMLElement } from '../../js/utils/cleanHTMLElement.js';

// Pagination constants
const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let totalPages;
let currentMeals = [];

document.addEventListener('DOMContentLoaded', startApp);

// Agregar event listener para el select de ordenamiento
document.getElementById('ordenarSelect').addEventListener('change', handleSort);

function handleSort(e) {
    const sortOrder = e.target.value;
    if (sortOrder === 'sin') {
        // Restaurar orden original
        startApp();
        return;
    }

    // Ordenar meals por precio
    currentMeals.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    // Resetear a la primera página y recargar
    currentPage = 1;
    loadPage(1);
}

//#region Start App
async function startApp() {
    const urlParams = new URLSearchParams(location.search);
    const categoria = urlParams.get('categoria');

    //si no nos indican una categoria mostramos todos los elementos
    if (categoria) {
        currentMeals = await new MealsRepository().getMealsFiltedByCategory(categoria);
    } else {
        currentMeals = await new MealsRepository().getMeals();
    }

    displayAmountOfItems();
    totalPages = Math.ceil(currentMeals.length / ITEMS_PER_PAGE);
    loadPage(1);
}

//#region Load Page
function loadPage(pageNumber) {
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const mealsToShow = currentMeals.slice(startIndex, endIndex);

    const mealsContainer = document.getElementById('mealsContainer');
    cleanHTMLElement(mealsContainer)

    loadListOfMeals(mealsToShow, mealsContainer);
    renderPagination();
}

//#region Render Paginacion
function renderPagination() {
    const paginationContainer = document.getElementById('paginacion');
    paginationContainer.innerHTML = '';

    // Previous button
    if (currentPage > 1) {
        const prevButton = createPaginationButton('Anterior', currentPage - 1);
        prevButton.classList.add('btn', 'btn-primary', 'mr-2');
        paginationContainer.appendChild(prevButton);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createPaginationButton(i.toString(), i);
        if (i === currentPage) {
            pageButton.classList.add('btn', 'btn-secondary');
        } else {
            pageButton.classList.add('btn', 'btn-neutral');
        }
        paginationContainer.appendChild(pageButton);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextButton = createPaginationButton('Siguiente', currentPage + 1);
        nextButton.classList.add('btn', 'btn-primary');
        paginationContainer.appendChild(nextButton);
    }
}

//#region Create Paginacion Btns
function createPaginationButton(text, pageNumber) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', () => {
        currentPage = pageNumber;
        loadPage(currentPage);
    });
    return button;
}

//#region Load Meals
async function loadListOfMeals(meals, container) {
    const fragment = document.createDocumentFragment();

    for (const meal of meals) {
        fragment.appendChild(await designMeal(meal));
    }

    container.appendChild(fragment);
}

//#region Design Meal
function designMeal(meal) {
    const { id, strMeal, strMealThumb, price } = meal;

    const mealCard = document.createElement('ARTICLE');

    const mealImage = document.createElement('IMG');
    const mealTitle = document.createElement('H2');
    const verReceta = document.createElement('BUTTON');
    const agregarReceta = document.createElement('BUTTON');
    const priceContainer = document.createElement('SPAN');

    mealCard.setAttribute('data-id', id);

    mealImage.src = strMealThumb;
    mealTitle.textContent = strMeal;
    verReceta.textContent = 'Ver receta';
    verReceta.classList.add('btn', 'btn-primary');
    agregarReceta.textContent = 'Agregar receta';
    agregarReceta.classList.add('btn', 'btn-neutral');
    priceContainer.textContent = `${price}$`;

    mealCard.appendChild(mealImage);
    mealCard.appendChild(mealTitle);
    mealCard.appendChild(priceContainer);
    mealCard.appendChild(verReceta);
    mealCard.appendChild(agregarReceta);

    agregarReceta.addEventListener('click', () => agregarRecetaAlCarrito(meal));
    verReceta.addEventListener('click', () => mostrarModal(meal));

    return Promise.resolve(mealCard);
}

//#region Mostrar Modal
function mostrarModal(meal) {
    const { strInstructions } = meal;

    const modal = document.createElement('DIALOG');
    const closeModal = document.createElement('BUTTON');
    const modalImage = document.createElement('IMG');
    const modalTitle = document.createElement('H2');
    const modalInstructions = document.createElement('P');
    const listaDeIngredientes = document.createElement('UL');

    const ingredientesFragment = designListaDeIngredientes(meal);
    if (ingredientesFragment) {
        listaDeIngredientes.appendChild(ingredientesFragment);
    }

    closeModal.textContent = 'Cerrar';
    closeModal.classList.add('btn', 'btn-info');

    modalImage.src = meal.strMealThumb;
    modalTitle.textContent = meal.strMeal;
    modalInstructions.textContent = strInstructions.split('[')[0];

    modal.appendChild(modalImage);
    modal.appendChild(modalTitle);
    modal.appendChild(modalInstructions);
    modal.appendChild(listaDeIngredientes);
    modal.appendChild(closeModal);

    document.body.appendChild(modal);

    closeModal.addEventListener('click', () => {
        modal.close();
        document.getElementById('mealsContainer').classList.remove('modalShown');
    });

    document.getElementById('mealsContainer').classList.add('modalShown');

    modal.showModal();
}

//#region Add To Carrito
function agregarRecetaAlCarrito(meal) {
    new Carrito().addItem(meal);
    displayAmountOfItems();
    modalConMensaje(ListDeMensajesDispoiblesEnum.ITEM_AGREGADO_AL_CARRITO, ListaDeTiposDeAlertaEnum.SUCCESS);
}

//#region Design Lista Ingredientes
function designListaDeIngredientes(meal) {
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const ingrdientContainer = document.createElement('LI');
            ingrdientContainer.textContent = ingredient;
            fragment.appendChild(ingrdientContainer);
        } else {
            break;
        }
    }
    return fragment.children.length > 0 ? fragment : null;
}