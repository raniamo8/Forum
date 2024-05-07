document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Statische Zugangsdaten
        const credentials = {
            admin: { username: 'admin@deos-ag.com', password: 'testadmin' },
            user: { username: 'user@deos-ag.com', password: 'testuser' }
        };

        // Prüfung der Anmeldedaten
        if (email === credentials.admin.username && password === credentials.admin.password) {
            alert('Admin erfolgreich angemeldet');
            // Weiterleitung oder spezifische Logik für Admin
        } else if (email === credentials.user.username && password === credentials.user.password) {
            alert('User erfolgreich angemeldet');
            // Weiterleitung oder spezifische Logik für User
        } else {
            alert('Falsche Anmeldedaten');
        }
    });
});
