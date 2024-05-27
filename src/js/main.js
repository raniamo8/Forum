// src/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    // Header laden
    loadComponent('header', '../html/components/header.html', 'header-placeholder');

    // Überprüfen, ob der Benutzer angemeldet ist
    checkLoginStatus();

    // Weitere Initialisierungen können hier erfolgen
});

function loadComponent(name, path, placeholderId) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(placeholderId).innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}

function checkLoginStatus() {
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        window.location.href = '../pages/login.html'; // Weiterleitung zur Login-Seite, wenn nicht angemeldet
    }
}
