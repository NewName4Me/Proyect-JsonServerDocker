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

    getCarrito() {
        return this.items;
    }

    getNumeroDeItems() {
        return [...this.items.values()].reduce((total, quantity) => total + quantity, 0);
    }
}