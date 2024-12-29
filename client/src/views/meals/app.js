//#region Imports
import { MealsRepository } from '../../js/repository/MealsRepository.js';
import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';
import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../../js/utils/modalConMensaje.js';
import { cleanHTMLElement } from '../../js/utils/cleanHTMLElement.js';

document.addEventListener('DOMContentLoaded', startApp);

//#region Start App
async function startApp() {
    loadPage(1);

    document.getElementById('ordenarSelect').addEventListener('change', (e) => {
        loadPage(1, null, e.target.value);
    });

    displayAmountOfItems();
}

async function loadPage(page, categoria = null, order = 'sin') {
    const urlParams = new URLSearchParams(location.search);
    if (!categoria) {
        categoria = urlParams.get('categoria'); // Toma categoría desde los parámetros
    }

    const mealsContainer = document.getElementById('mealsContainer');
    cleanHTMLElement(mealsContainer);

    let currentMeals;

    if (categoria) {
        currentMeals = await new MealsRepository().getMealsFiltedByCategory(categoria, page, 8, order);
    } else {
        currentMeals = await new MealsRepository().getMeals(page, 8, order);
    }

    if (currentMeals && currentMeals.data.length > 0) {
        loadListOfMeals(currentMeals.data, mealsContainer).then(() => {
            document.querySelector('.spinner').style.display = 'none';
        });
        loadPagination(currentMeals.pages, page, categoria); // Incluye la categoría
    } else {
        mealsContainer.textContent = 'No se encontraron resultados.';
    }
}


function loadPagination(pages, currentPage = 1, categoria = null) {
    const $paginacion = document.getElementById('paginacion');
    cleanHTMLElement($paginacion);

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= pages; i++) {
        const pagBtn = document.createElement('BUTTON');
        pagBtn.textContent = i;
        pagBtn.classList.add('btn-secondary', 'pag-btn');

        if (i === currentPage) {
            pagBtn.classList.add('pag-btn-active');
        }

        pagBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            loadPage(i, categoria);
        });

        fragment.appendChild(pagBtn);
    }

    $paginacion.appendChild(fragment);
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
    const btnsContainer = document.createElement('SECTION');
    const priceContainer = document.createElement('SPAN');
    const mealCardBasicInfo = document.createElement('DIV');
    mealCardBasicInfo.classList.add('mealCardBasicInfo');

    btnsContainer.classList.add('btn-Container');

    mealCard.setAttribute('data-id', id);
    mealCard.classList.add('bxS-floating');

    mealImage.src = strMealThumb;
    mealTitle.textContent = strMeal;
    verReceta.textContent = 'Ver receta';
    verReceta.classList.add('btn', 'btn-primary');
    agregarReceta.textContent = 'Agregar receta';
    agregarReceta.classList.add('btn', 'btn-neutral');
    priceContainer.textContent = `${price}$`;

    mealCard.appendChild(mealImage);
    mealCardBasicInfo.appendChild(mealTitle);
    mealCardBasicInfo.appendChild(priceContainer);

    btnsContainer.appendChild(verReceta);
    btnsContainer.appendChild(agregarReceta);

    mealCard.appendChild(mealCardBasicInfo);
    mealCard.appendChild(btnsContainer);

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