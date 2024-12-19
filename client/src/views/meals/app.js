import { MealsRepository } from '../../js/repository/MealsRepository.js';
import { Carrito } from '../../js/entities/Carrito.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';

document.addEventListener('DOMContentLoaded', startApp);

async function startApp() {
    const urlParams = new URLSearchParams(location.search);
    const categoria = urlParams.get('categoria');

    let mealList = [];

    //si no nos indican una categoria mostramos todos los elementos
    if (categoria) {
        mealList = await new MealsRepository().getMealsFiltedByCategory(categoria);
    }
    else {
        mealList = await new MealsRepository().getMeals();
    }

    displayAmountOfItems();

    loadListOfMeals(mealList, mealsContainer);
}

/**
 * 
 * @param {Array<Object>} list 
 * @param {HTMLElement} container 
 */
async function loadListOfMeals(meals, container) {
    const fragment = document.createDocumentFragment();

    for (const meal of meals) {
        fragment.appendChild(await designMeal(meal));
    }

    container.appendChild(fragment);
}

function designMeal(meal) {
    const { id, strMeal, strMealThumb } = meal;

    const mealCard = document.createElement('ARTICLE');

    const mealImage = document.createElement('IMG');
    const mealTitle = document.createElement('H2');
    const verReceta = document.createElement('BUTTON');
    const agregarReceta = document.createElement('BUTTON');

    mealCard.setAttribute('data-id', id);

    mealImage.src = strMealThumb;
    mealTitle.textContent = strMeal;
    verReceta.textContent = 'Ver receta';
    verReceta.classList.add('btn', 'btn-primary');
    agregarReceta.textContent = 'Agregar receta';
    agregarReceta.classList.add('btn', 'btn-neutral');

    mealCard.appendChild(mealImage);
    mealCard.appendChild(mealTitle);
    mealCard.appendChild(verReceta);
    mealCard.appendChild(agregarReceta);

    agregarReceta.addEventListener('click', () => agregarRecetaAlCarrito(meal));
    verReceta.addEventListener('click', () => mostrarModal(meal));

    return Promise.resolve(mealCard);
}
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
    closeModal.classList.add('btn', 'btn-primary');

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

function agregarRecetaAlCarrito(meal) {
    new Carrito().addItem(meal);
    displayAmountOfItems();
}

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

