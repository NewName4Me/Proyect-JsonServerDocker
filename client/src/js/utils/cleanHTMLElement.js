/**
 * 
 * @param {HTMLElement} element 
 */
export function cleanHTMLElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}