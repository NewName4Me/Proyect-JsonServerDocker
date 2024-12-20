import { MealsRepository } from '../repository/MealsRepository.js';

export class Carrito {
    constructor() {
        this.items = new Map();
        if (localStorage.getItem('carritoMeals')) {
            this.items = new Map(JSON.parse(localStorage.getItem('carritoMeals')));
        }
    }

    addItem(item) {
        if (this.items.has(item.id)) {
            this.items.set(item.id, this.items.get(item.id) + 1);
        } else {
            this.items.set(item.id, 1);
        }
        localStorage.setItem('carritoMeals', JSON.stringify([...this.items]));
    }

    removeOneItem(item) {
        if (this.items.has(item.id) && this.items.get(item.id) > 1) {
            this.items.set(item.id, this.items.get(item.id) - 1);
        } else {
            this.items.delete(item.id);
        }
        localStorage.setItem('carritoMeals', JSON.stringify([...this.items]));
    }

    getCarrito() {
        return this.items;
    }

    getNumeroDeItems() {
        return [...this.items.values()].reduce((total, quantity) => total + quantity, 0);
    }

    async getPrecioTotalCarrito() {
        const promises = [...this.items.entries()].map(async ([key, quantity]) => {
            const item = await new MealsRepository().getMealById(key);
            return item.price * quantity;
        });
        const prices = await Promise.all(promises);
        return prices.reduce((total, price) => total + price, 0).toFixed(2);
    }
}

