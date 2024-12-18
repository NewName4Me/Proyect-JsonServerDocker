import { CategoriesRepository } from '../../js/repository/CategoriesRepository.js';

document.addEventListener('DOMContentLoaded', startApp);

async function startApp() {
    const categories = await new CategoriesRepository().getCategories();
    const categoriesContainer = document.getElementById('categoriesContainer');

    loadListOfCategories(categories, categoriesContainer);
}

/**
 * 
 * @param {Array<Object} categories 
 * @param {HTMLElement} categoriesContainer
 */
function loadListOfCategories(categories = [{}], categoriesContainer) {

    const fragment = document.createDocumentFragment();

    categories.forEach(category => {
        fragment.appendChild(designCategory(category));
    });

    categoriesContainer.appendChild(fragment);
}

function designCategory(category) {
    const { id, strCategory, strCategoryThumb, strCategoryDescription } = category;

    const categoryContainer = document.createElement('ARTICLE');

    const categoryTitle = document.createElement('H2');
    const categoryImage = document.createElement('IMG');
    const categoryDescription = document.createElement('p');

    categoryContainer.setAttribute('data-id', id);

    categoryTitle.textContent = strCategory;
    categoryImage.src = strCategoryThumb;
    categoryDescription.textContent = strCategoryDescription.split('[')[0];

    categoryContainer.appendChild(categoryImage);
    categoryContainer.appendChild(categoryTitle);
    categoryContainer.appendChild(categoryDescription);

    return categoryContainer;
}