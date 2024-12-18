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
    const { id, strMeal, strInstructions, strMealThumb } = meal;

    const categoryContainer = document.createElement('ARTICLE');

    const categoryTitle = document.createElement('H2');
    const categoryImage = document.createElement('IMG');
    const categoryInstructions = document.createElement('P');
    const verRecetaCategoria = document.createElement('A');

    categoryContainer.setAttribute('data-id', id);

    categoryTitle.textContent = strMeal;
    categoryImage.src = strMealThumb;
    categoryInstructions.textContent = strInstructions.split('[')[0];
    verRecetaCategoria.textContent = 'Ver receta';
    verRecetaCategoria.classList.add('btn', 'btn-primary');


    categoryContainer.appendChild(categoryImage);
    categoryContainer.appendChild(categoryTitle);
    categoryContainer.appendChild(categoryInstructions);
    categoryContainer.appendChild(verRecetaCategoria);

    return Promise.resolve(categoryContainer);
}