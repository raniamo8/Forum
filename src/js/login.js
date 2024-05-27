// src/js/login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Statische Zugangsdaten
        const credentials = {
            admin: { username: 'admin@example.com', password: 'testadmin' },
            user: { username: 'user@example.com', password: 'testuser' }
        };

        // Prüfung der Anmeldedaten
        if (email === credentials.admin.username && password === credentials.admin.password) {
            alert('Admin erfolgreich angemeldet');
            localStorage.setItem('userRole', 'admin');
            window.location.href = 'src/html/pages/home.html'; // Weiterleitung zur Homepage
        } else if (email === credentials.user.username && password === credentials.user.password) {
            alert('User erfolgreich angemeldet');
            localStorage.setItem('userRole', 'user');
            window.location.href = '../../pages/home.html'; // Weiterleitung zur Homepage
        } else {
            alert('Falsche Anmeldedaten');
        }
    });
});
