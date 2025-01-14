//#region Imports
import { API_CATEGORIES_URI } from '../../../config/env.js';

//#region Category Rep. Class
export class CategoriesRepository {

    //#region Attributes
    #Categories_API = API_CATEGORIES_URI;

    //#region GETTERS
    async getCategories() {
        try {
            const data = await fetch(this.#Categories_API);
            return await data.json();
        } catch (e) {
            throw new Error('Error al tomar las Categories =>' + e);
        }
    }
}