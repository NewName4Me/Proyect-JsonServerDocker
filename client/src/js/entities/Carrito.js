export class Carrito {
    constructor() {
        this.items = [];
        if (localStorage.getItem('carritoMeals')) {
            this.items = JSON.parse(localStorage.getItem('carritoMeals'));
        }
    }

    addItem(item) {
        this.items.push(item);
        localStorage.setItem('carritoMeals', JSON.stringify(this.items));
    }

    getCarrito() {
        return this.items;
    }
}

