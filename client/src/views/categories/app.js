import { CategoriesRepository } from '../../js/repository/CategoriesRepository.js';
import { MealsRepository } from '../../js/repository/MealsRepository.js';
import { displayAmountOfItems } from '../../js/utils/displayItemsAmountInCarrito.js';

document.addEventListener('DOMContentLoaded', startApp);

async function startApp() {
    const categories = await new CategoriesRepository().getCategories();
    const categoriesContainer = document.getElementById('categoriesContainer');

    loadListOfCategories(categories, categoriesContainer);

    displayAmountOfItems();
}

/**
 * 
 * @param {Array<Object} categories 
 * @param {HTMLElement} categoriesContainer
 */
async function loadListOfCategories(categories = [{}], categoriesContainer) {

    const fragment = document.createDocumentFragment();

    for (const category of categories) {
        fragment.appendChild(await designCategory(category));
    }

    categoriesContainer.appendChild(fragment);
}

async function designCategory(category) {
    const { id, strCategory, strCategoryThumb, strCategoryDescription } = category;

    const categoryContainer = document.createElement('ARTICLE');

    const categoryTitle = document.createElement('H2');
    const categoryImage = document.createElement('IMG');
    const categoryDescription = document.createElement('P');
    const verRecetasCategoria = document.createElement('A');
    const amountOfMealsPerCategory = document.createElement('P');

    const informationContainer = document.createElement('DIV');
    informationContainer.classList.add('informationContainer');

    categoryContainer.setAttribute('data-id', id);
    categoryContainer.classList.add('bxS-floating');

    categoryTitle.textContent = strCategory;
    categoryImage.src = strCategoryThumb;
    categoryDescription.textContent = strCategoryDescription.split('[')[0];
    verRecetasCategoria.textContent = 'Ver recetas';
    verRecetasCategoria.classList.add('btn', 'btn-primary');
    verRecetasCategoria.href = `../meals?categoria=${strCategory}`;
    amountOfMealsPerCategory.textContent = await getAmountOfMealsPerCategory(strCategory);
    amountOfMealsPerCategory.classList.add('amountOfMeals');


    categoryContainer.appendChild(categoryImage);

    informationContainer.appendChild(categoryTitle);
    informationContainer.appendChild(categoryDescription);
    informationContainer.appendChild(verRecetasCategoria);

    categoryContainer.appendChild(amountOfMealsPerCategory);
    categoryContainer.appendChild(informationContainer);

    return Promise.resolve(categoryContainer);
}

async function getAmountOfMealsPerCategory(category = '') {
    return (await new MealsRepository().getMealsFiltedByCategory(category)).length;
}