import { API_MEALS_URI } from '../../../config/env.js';

export class MealsRepository {

    #Meals_API = API_MEALS_URI;

    async getMeals(page = 1, items_per_page = 8, order = null) {
        let data;

        switch (order) {
            case 'sin':
                data = await fetch(`${this.#Meals_API}?_page=${page}&_per_page=${items_per_page}`);
                break;
            case 'asc':
                data = await fetch(`${this.#Meals_API}?_sort=price&_page=${page}&_per_page=${items_per_page}`);
                break;
            case 'desc':
                data = await fetch(`${this.#Meals_API}?_sort=-price&_page=${page}&_per_page=${items_per_page}`);
                break;
            default: throw new Error('Forma de ordenar no valida');
        }
        return await data.json() || null;
    }

    async getMealsFiltedByCategory(category = '', page = 1, items_per_page = 8, order = null) {
        const data = await fetch(`${this.#Meals_API}?_page=${page}&_per_page=${items_per_page}&strCategory=${category}`);
        return await data.json();
    }

    async getMealById(id) {
        const data = await fetch(`${this.#Meals_API}/${id}`);
        return await data.json();
    }
}