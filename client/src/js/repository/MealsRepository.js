//#region Imports
import { API_MEALS_URI } from '../../../config/env.js';

//#region Meals Rep. Class
export class MealsRepository {

    //#region Attributes
    #Meals_API = API_MEALS_URI;
    #OrderMap;

    //#region Contructor
    constructor() {
        this.#OrderMap = Object.freeze({
            'sin': '',
            'asc': 'price',
            'desc': '-price'
        });
    }

    //#region __Get Meals
    /**
     * funcion que nos devuelve todas las comidas existentes dependiendo de si recibe o no un orden estarán organizadas de 
     * forma ascendete, descendente o no 
     * usando paginacion
     * @param {Number} page 
     * @param {Number} items_per_page 
     * @param {String} order 
     * @returns {JSON}
     */
    async getMeals(page = 1, items_per_page = 8, order = null) {
        const data = await fetch(`${this.#Meals_API}?_sort=${this.#OrderMap[order]}&_page=${page}&_per_page=${items_per_page}`);
        return await data.json() || null;
    }

    //#region __Get Meals By Category
    /**
     * esta funcion podria haberla agrupado con la anterior (getMeals(`parameters`)) pero lo dividi por mejor legibilidad
     * nos devuelve todos los alimentos de una categoria especifica ordenadors o no
     * usando paginacion
     * @param {String} category 
     * @param {Number} page 
     * @param {Number} items_per_page 
     * @param {String} order 
     * @returns {JSON}
     */
    async getMealsFiltedByCategory(category = '', page = 1, items_per_page = 8, order = null) {
        const data = await fetch(`${this.#Meals_API}?_sort=${this.#OrderMap[order]}&_page=${page}&_per_page=${items_per_page}&strCategory=${category}`);
        return await data.json();
    }

    //#region __Get Meal By Id
    /**
     * funcion que nos devuelve los datos específicos de una comida en particular dado su id
     * @param {Number} id 
     * @returns {JSON}
     */
    async getMealById(id) {
        const data = await fetch(`${this.#Meals_API}/${id}`);
        return await data.json();
    }
}