(() => {
    document.addEventListener('DOMContentLoaded', handleLogout);

    function handleLogout() {
        const $logoutBtn = document.getElementById('logout');

        $logoutBtn.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = '../..';
        });
    }

})()