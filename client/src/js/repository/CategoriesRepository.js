import { API_CATEGORIES_URI } from '../../../config/env.js';

export class CategoriesRepository {

    #Categories_API = API_CATEGORIES_URI;

    async getCategories() {
        const data = await fetch(this.#Categories_API);
        return await data.json();
    }
}