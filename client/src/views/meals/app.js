import { MealsRepository } from '../../js/repository/MealsRepository.js';

document.addEventListener('DOMContentLoaded', startApp);

async function startApp() {
    const urlParams = new URLSearchParams(location.search);
    const categoria = urlParams.get('categoria') || 'Parameter not defined';
    const mealsContainer = document.getElementById('mealsContainer');

    const mealList = await new MealsRepository().getMealsFiltedByCategory(categoria);
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

    mealCard.setAttribute('data-id', id);

    mealImage.src = strMealThumb;
    mealTitle.textContent = strMeal;
    verReceta.textContent = 'Ver receta';
    verReceta.classList.add('btn', 'btn-primary');

    mealCard.appendChild(mealImage);
    mealCard.appendChild(mealTitle);
    mealCard.appendChild(verReceta);

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

    closeModal.textContent = 'Cerrar';
    closeModal.classList.add('btn', 'btn-primary');

    modalImage.src = meal.strMealThumb;
    modalTitle.textContent = meal.strMeal;
    modalInstructions.textContent = strInstructions.split('[')[0];

    modal.appendChild(modalImage);
    modal.appendChild(modalTitle);
    modal.appendChild(modalInstructions);
    modal.appendChild(closeModal);

    document.body.appendChild(modal);

    closeModal.addEventListener('click', () => {
        modal.close();
        document.getElementById('mealsContainer').classList.remove('modalShown');
    });

    document.getElementById('mealsContainer').classList.add('modalShown');

    modal.showModal();
}
