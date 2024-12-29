import { Carrito } from '../src/js/entities/Carrito.js';

describe('Tests de mi carrito', () => {

    let myCarrito;

    /**
     * hacer un mock del LocalStorage dado que este no existe en realidad
     */
    beforeAll(() => {
        const localStorageMock = (() => {
            let store = {};

            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => {
                    store[key] = value.toString();
                },
                removeItem: (key) => {
                    delete store[key];
                },
                clear: () => {
                    store = {};
                }
            }
        })();
        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock
        });
    });

    /**
     * antes de realizar cualquier test limpiamos el carrito que exista por si acaso
     */
    beforeEach(() => {
        myCarrito = new Carrito();
        localStorage.clear();
    });

    //#region Start Empty
    it('Debería inicializar vacio', () => {
        expect(myCarrito.getNumeroDeItems()).toBe(0);
    });
});