//#region Imports
import { MealsRepository } from '../repository/MealsRepository.js';

//#region Carrito Class
export class Carrito {

    //#region __constructor
    constructor() {
        this.items = new Map();
        if (localStorage.getItem('carritoMeals')) {
            this.items = new Map(JSON.parse(localStorage.getItem('carritoMeals')));
        }
    }

    //#region __Clean Carrito
    /**
     * funcion que limpia todos los items de nuestro carrito
     */
    cleanCarrito() {
        this.items.clear();
        localStorage.removeItem('carritoMeals');
    }

    //#region __Add item
    /**
     * funcion que nos agrega a nuestro carrito el id del item que estamos agregando junto con la cantidad de este item
     * comprobando antes si esta ya estaba agregado para no tener el mismo objeto separado en  dos partes
     * @param {Object} item 
     */
    addItem(item) {
        if (this.items.has(item.id)) {
            this.items.set(item.id, this.items.get(item.id) + 1);
        } else {
            this.items.set(item.id, 1);
        }
        localStorage.setItem('carritoMeals', JSON.stringify([...this.items]));
    }

    //#region __Remove Item
    /**
     * comprueba la cantidad que nos queda del objeto pasado como parametro y le reducimos uno a este, o si solo queda 1 lo 
     * eliminamos por completo del carrito
     * @param {Object} item 
     */
    removeOneItem(item) {
        if (this.items.has(item.id) && this.items.get(item.id) > 1) {
            this.items.set(item.id, this.items.get(item.id) - 1);
        } else {
            this.items.delete(item.id);
        }
        localStorage.setItem('carritoMeals', JSON.stringify([...this.items]));
    }

    //#region __Get Carrito
    /**
     * nos devuelve nuestro carrito 
     * @returns {Map<Number,Number>}
     */
    getCarrito() {
        return this.items;
    }

    //#region __Get Number Items
    /**
     * funcion que nos devuelve el número de items que tenemos en total en todo el carrito,
     *  dado que this.items.size no refleja la realidad, debido a que hay items que pueden estar multiples veces
     * y solo lo podemos saber mirando el [value] que tiene cada una de nuestras ocurrencias
     * @returns {Number}
     */
    getNumeroDeItems() {
        return [...this.items.values()].reduce((total, quantity) => total + quantity, 0);
    }

    //#region 
    /**
     * function que mira el id([key]) de cada ocurrencia y toma el elemento de esta, para extraer de cada una su precio
     * y sumarlo a un total
     * @returns {Number}
     */
    async getPrecioTotalCarrito() {
        const promises = [...this.items.entries()].map(async ([key, quantity]) => {
            const item = await new MealsRepository().getMealById(key);
            return item.price * quantity;
        });
        const prices = await Promise.all(promises);
        return prices.reduce((total, price) => total + price, 0).toFixed(2);
    }
}


