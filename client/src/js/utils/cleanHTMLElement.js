/**
 * dado un elemento del DOM, elimina todos los hijos de este, hace lo mismo que :
 * element.innerHTML = ''
 * pero teoricamente esta forma es más eficiente cuando tienes una cantidad muy grande de hijos 
 * @param {HTMLElement} element 
 */
export function cleanHTMLElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}