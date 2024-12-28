document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const btnList = document.querySelectorAll('BUTTON');
    btnList.forEach(btn => btn.addEventListener('click', e => checkAutentication(e)));

    const checkAuthItems = document.querySelectorAll('.checkAuth');
    checkAuthItems.forEach(item => item.addEventListener('click', e => checkAutentication(e)));
}

/**
 * 
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