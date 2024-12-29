import { API_MEALS_URI } from '../../../config/env.js';

export class MealsRepository {

    #Meals_API = API_MEALS_URI;
    #OrderMap;

    constructor() {
        this.#OrderMap = Object.freeze({
            'sin': '',
            'asc': 'price',
            'desc': '-price'
        });
    }

    async getMeals(page = 1, items_per_page = 8, order = null) {
        const data = await fetch(`${this.#Meals_API}?_sort=${this.#OrderMap[order]}&_page=${page}&_per_page=${items_per_page}`);
        return await data.json() || null;
    }

    async getMealsFiltedByCategory(category = '', page = 1, items_per_page = 8, order = null) {
        const data = await fetch(`${this.#Meals_API}?_sort=${this.#OrderMap[order]}&_page=${page}&_per_page=${items_per_page}&strCategory=${category}`);
        return await data.json();
    }

    async getMealById(id) {
        const data = await fetch(`${this.#Meals_API}/${id}`);
        return await data.json();
    }
}