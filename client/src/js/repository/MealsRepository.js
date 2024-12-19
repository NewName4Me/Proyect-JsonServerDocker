import { API_MEALS_URI } from '../../../config/env.js';

export class MealsRepository {

    #Meals_API = API_MEALS_URI;

    async getMeals() {
        const data = await fetch(this.#Meals_API);
        return await data.json();
    }

    async getMealsFiltedByCategory(category = '') {
        const data = await fetch(`${this.#Meals_API}?strCategory=${category}`);
        return await data.json();
    }

    async getMealById(id) {
        const data = await fetch(`${this.#Meals_API}/${id}`);
        return await data.json();
    }
}