document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.fa-right-from-bracket').parentElement;

    logoutButton.addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        window.location.href = '/Forum/src/html/pages/login.html';
    });
});
