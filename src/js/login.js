/**
 * @file Manages the login functionality, validating user credentials and setting user roles.
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    /**
     * Handles the login form submission.
     * @param {Event} event - The form submission event.
     */
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const credentials = {
            admin: { username: 'admin@deos-ag.com', password: 'testadmin' },
            user: { username: 'user@deos-ag.com', password: 'testuser' }
        };

        /**
         * Validates the email and password against predefined credentials.
         * If the credentials match, sets the user role and redirects to the home page.
         */
        if (email === credentials.admin.username && password === credentials.admin.password) {
            //alert('Admin erfolgreich angemeldet');
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('username', 'Admin');
            window.location.href = "welcome.html";
        } else if (email === credentials.user.username && password === credentials.user.password) {
            //alert('User erfolgreich angemeldet');
            localStorage.setItem('userRole', 'user');
            localStorage.setItem('username', 'User');
            window.location.href = "home.html";
        } else {
            alert('Falsche Anmeldedaten');
        }
    });
});
