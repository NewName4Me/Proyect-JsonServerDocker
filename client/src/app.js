document.addEventListener('DOMContentLoaded', checkAutentication);

function checkAutentication() {
    const isAutenticated = localStorage.getItem('autenticated');

    if (isAutenticated) {
        window.location.href = './views/categories';
    }

    window.location.href = './views/login/';
}