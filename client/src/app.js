document.addEventListener('DOMContentLoaded', startApp);

//#region Start App
function startApp() {
    const btnList = document.querySelectorAll('BUTTON');
    btnList.forEach(btn => btn.addEventListener('click', e => checkAutentication(e)));

    const checkAuthItems = document.querySelectorAll('.checkAuth');
    checkAuthItems.forEach(item => item.addEventListener('click', e => checkAutentication(e)));
}

//region Check Autentication
/**
 *  funcion encargada de comprobar si el usuario esta ya o no autenticado, si no lo esta
 * le redirijimos a la página de login si no le muestra la página de categorias
 * @param {Event} e 
 */
function checkAutentication(e) {
    e.preventDefault();

    const isAutenticated = sessionStorage.getItem('autentication');

    if (isAutenticated) {
        window.location.href = './views/categories';
        return;
    }

    window.location.href = './views/login/';
}