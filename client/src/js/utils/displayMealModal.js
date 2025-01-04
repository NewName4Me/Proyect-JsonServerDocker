//#region Mostrar Modal
/**
 * modal que muestra los detalles de nuestra comida con los botones adecuados para poder cerrar
 * @param {Object} meal 
 */
export function mostrarModal(meal) {
    console.log(meal);
    const { strInstructions, strArea, strYoutube } = meal;

    const modal = document.createElement('DIALOG');
    const modalContent = document.createElement('DIV');
    const closeModal = document.createElement('BUTTON');
    const modalImage = document.createElement('IMG');
    const modalTitle = document.createElement('H2');
    const modalInstructions = document.createElement('P');
    const listaDeIngredientes = document.createElement('UL');
    const infoAdicional = document.createElement('DIV');

    modalContent.classList.add('modal-content');
    infoAdicional.classList.add('info-adicional');

    // Agregar área y enlace de YouTube
    const areaSpan = document.createElement('SPAN');
    areaSpan.innerHTML = `<strong>Origen:</strong> ${strArea}`;
    infoAdicional.appendChild(areaSpan);

    if (strYoutube) {
        const youtubeLink = document.createElement('A');
        youtubeLink.href = strYoutube;
        youtubeLink.target = '_blank';
        youtubeLink.classList.add('youtube-link');
        youtubeLink.innerHTML = '<strong>Ver en YouTube</strong> <span class="videoIcon">🎥</span>';
        infoAdicional.appendChild(youtubeLink);
    }

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
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(infoAdicional);
    modalContent.appendChild(modalInstructions);
    modalContent.appendChild(listaDeIngredientes);
    modalContent.appendChild(closeModal);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    closeModal.addEventListener('click', () => {
        modal.close();
        document.getElementById('mealsContainer').classList.remove('modalShown');
    });

    const mealContaier = document.getElementById('mealsContainer');
    if (mealContaier) {
        mealContaier.classList.add('modalShown');
    }

    modal.showModal();

    modal.scrollTo({
        top: 0,
        behavior: 'auto'
    });
}

//#region Design Lista Ingredientes
/**
 * function que le da estilos a la lista de ingredientes que tenemos para cada comida
 * @param {Object} meal 
 * @returns {HTMLElement}
 */
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