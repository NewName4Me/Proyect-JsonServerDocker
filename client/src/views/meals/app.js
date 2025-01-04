//#region Imports
import { MealsRepository } from '../../js/repository/MealsRepository.js';
import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';
import { ListDeMensajesDispoiblesEnum, ListaDeTiposDeAlertaEnum, modalConMensaje } from '../../js/utils/modalConMensaje.js';
import { cleanHTMLElement } from '../../js/utils/cleanHTMLElement.js';
import { mostrarModal } from '../../js/utils/displayMealModal.js';

document.addEventListener('DOMContentLoaded', startApp);

//#region Start App
async function startApp() {
    loadPage(1);

    document.getElementById('ordenarSelect').addEventListener('change', (e) => {
        loadPage(1, null, e.target.value);
    });

    displayAmountOfItems();
}

//#region Load Page
/**
 * function que carga el cotnenido de la página principal, donde utilizando paginacion mostramos la cantidad deseada
 * y mediante uninput podemso cambiar el orden en el que semuestran en funcion del precio
 * @param {Number} page 
 * @param {String} categoria 
 * @param {String} order 
 */
async function loadPage(page, categoria = null, order = 'sin') {
    const urlParams = new URLSearchParams(location.search);
    if (!categoria) {
        categoria = urlParams.get('categoria'); // Toma categoría desde los parámetros
    }

    const mealsContainer = document.getElementById('mealsContainer');
    cleanHTMLElement(mealsContainer);

    let currentMeals;

    //si nos han indicado alguna categoria cargamos filtrados por esa categoria, si no mostramos todos
    if (categoria) {
        currentMeals = await new MealsRepository().getMealsFiltedByCategory(categoria, page, 8, order);
    } else {
        currentMeals = await new MealsRepository().getMeals(page, 8, order);
    }

    //si tenemos datos los mostramos y ocultamos el spiiner, si no decimos que no se encontraron resultados
    if (currentMeals && currentMeals.data.length > 0) {
        loadListOfMeals(currentMeals.data, mealsContainer).then(() => {
            document.querySelector('.spinner').style.display = 'none';
        });
        loadPagination(currentMeals.pages, page, categoria); // Incluye la categoría
    } else {
        mealsContainer.textContent = 'No se encontraron resultados.';
    }
}

//#region Load Pagination
/**
 * funcion que carga los botones de la paginacion con los estilos adecuados para poder distinguir correctamente 
 * en que página estamos actualmemten 
 * @param {Number} pages 
 * @param {Number} currentPage 
 * @param {String} categoria 
 */
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

        //despues de cambiar de pagina muevo al usuario a la parte superior para hacerlo más cómodo
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
/**
 * funcion que carga tods las comidas recibidas por la API utiliando un fragmenteo para mayor eficiencia
 * @param {JSON} meals 
 * @param {HTMLElement} container 
 */
async function loadListOfMeals(meals, container) {
    const fragment = document.createDocumentFragment();

    for (const meal of meals) {
        fragment.appendChild(await designMeal(meal));
    }

    container.appendChild(fragment);
}

//#region Design Meal
/**
 * function que le da los estilos básicos a cada comida generada
 * @param {Object} meal 
 * @returns 
 */
function designMeal(meal) {
    const { id, strMeal, strMealThumb, price, strTags, strCategory } = meal;

    const mealCard = document.createElement('ARTICLE');
    const mealImage = document.createElement('IMG');
    const mealTitle = document.createElement('H2');
    const verReceta = document.createElement('BUTTON');
    const agregarReceta = document.createElement('BUTTON');
    const btnsContainer = document.createElement('SECTION');
    const priceContainer = document.createElement('SPAN');
    const mealCardBasicInfo = document.createElement('DIV');
    const tagsContainer = document.createElement('DIV');

    mealCardBasicInfo.classList.add('mealCardBasicInfo');
    tagsContainer.classList.add('tagsContainer');
    btnsContainer.classList.add('btn-Container');

    // Agregar tags si existen
    if (strTags) {
        const tags = strTags.split(',');
        tags.forEach(tag => {
            const tagSpan = document.createElement('SPAN');
            tagSpan.textContent = tag.trim();
            tagSpan.classList.add('tag');
            tagsContainer.appendChild(tagSpan);
        });

    }
    const categoryAsTag = document.createElement('SPAN');
    categoryAsTag.textContent = strCategory;
    categoryAsTag.classList.add('tag', 'bxS-floating');

    tagsContainer.appendChild(categoryAsTag);

    mealCard.setAttribute('data-id', id);
    mealCard.classList.add('bxS-floating');

    mealImage.src = strMealThumb;
    mealTitle.textContent = strMeal;
    verReceta.textContent = 'Ver receta';
    verReceta.classList.add('btn', 'btn-primary', 'bxS-floating');
    agregarReceta.textContent = 'Agregar receta';
    agregarReceta.classList.add('btn', 'btn-neutral', 'bxS-floating');
    priceContainer.textContent = `${price} $`;
    priceContainer.classList.add('priceContainer', 'btn-success', 'bxS-floating');

    mealCard.appendChild(mealImage);
    mealCardBasicInfo.appendChild(mealTitle);
    mealCardBasicInfo.appendChild(priceContainer);
    mealCard.appendChild(mealCardBasicInfo);
    mealCard.appendChild(tagsContainer);
    btnsContainer.appendChild(verReceta);
    btnsContainer.appendChild(agregarReceta);
    mealCard.appendChild(btnsContainer);

    agregarReceta.addEventListener('click', () => agregarRecetaAlCarrito(meal));
    verReceta.addEventListener('click', () => mostrarModal(meal));

    return Promise.resolve(mealCard);
}


//#region Add To Carrito
/**
 * funcion que agrega una receta a nuestro carrito y nos muestra un modal indicandolo
 * @param {Object} meal 
 */
function agregarRecetaAlCarrito(meal) {
    try {
        new Carrito().addItem(meal);
        displayAmountOfItems();
        modalConMensaje(ListDeMensajesDispoiblesEnum.ITEM_AGREGADO_AL_CARRITO, ListaDeTiposDeAlertaEnum.SUCCESS);
    } catch (e) {
        modalConMensaje(ListDeMensajesDispoiblesEnum.ERROR_PROBLEMA_PARA_AGREGAR_ITEM, ListaDeTiposDeAlertaEnum.ERROR);
    }
}

