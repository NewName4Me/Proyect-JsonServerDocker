import { Carrito } from '../src/js/entities/Carrito.js';

describe('Tests de mi carrito', () => {

    //#region Attributes
    let myCarrito;


    //#region Mock Local Storage
    /**
     * hacer un mock del LocalStorage dado que este no existe en realidad
     */
    beforeAll(() => {
        const localStorageMock = (() => {
            let store = {};

            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => store[key] = value.toString(),
                removeItem: (key) => delete store[key],
                clear: () => store = {},
                getAll: () => store,
            }
        })();

        Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    });

    //#region Initalize Carrito
    /**
     * antes de realizar cualquier test limpiamos el carrito que exista por si acaso
     */
    beforeEach(() => {
        localStorage.clear();
        myCarrito = new Carrito();
    });

    //#region Start Empty
    it('Debería inicializar vacio', () => {
        expect(myCarrito.getNumeroDeItems()).toBe(0);
    });

    //#region Add item
    it('Deberia agregar un item al carrito', () => {
        myCarrito.addItem({ hola: 'que  tal' });
        expect(myCarrito.getNumeroDeItems()).toBe(1);
    });

    it('Deberia eliminar un item del carrito', () => {
        const item = { id: '123', name: 'Pizza', price: 10 };
        myCarrito.addItem(item);
        myCarrito.removeOneItem(item);
        expect(myCarrito.getNumeroDeItems()).toBe(0);
    });
});