document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const btnList = document.querySelectorAll('BUTTON');
    btnList.forEach(btn => btn.addEventListener('click', checkAutentication))
}

function checkAutentication() {
    const isAutenticated = localStorage.getItem('autenticated');

    if (isAutenticated) {
        window.location.href = './views/categories';
    }

    window.location.href = './views/login/';
}