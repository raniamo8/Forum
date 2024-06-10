// src/js/login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const credentials = {
            admin: { username: 'admin@deos-ag.com', password: 'testadmin' },
            user: { username: 'user@deos-ag.com', password: 'testuser' }
        };

        if (email === credentials.admin.username && password === credentials.admin.password) {
            alert('Admin erfolgreich angemeldet');
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('username', 'Admin'); // Benutzernamen speichern
            window.location.href = "../../html/pages/home.html";
        } else if (email === credentials.user.username && password === credentials.user.password) {
            alert('User erfolgreich angemeldet');
            localStorage.setItem('userRole', 'user');
            localStorage.setItem('username', 'User'); // Benutzernamen speichern
            window.location.href = "../../html/pages/home.html";
        } else {
            alert('Falsche Anmeldedaten');
        }
    });
});
