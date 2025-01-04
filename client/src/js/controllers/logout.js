(() => {
    document.addEventListener('DOMContentLoaded', handleLogout);

    /**
     * funcion que limpia la sesion y nos redirije a la pagina inicial
     */
    function handleLogout() {
        const $logoutBtn = document.getElementById('logout');

        $logoutBtn.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = '../..';
        });
    }

})()