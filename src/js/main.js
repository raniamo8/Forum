//TODO: Main als Startpunkt für den Server
//TODO: Funktion Beitrag als abgeschlossen
//TODO: Medien hochladen, bearbeiten, löschen, anklicken und downloaden
//TODO: Tag
//TODO: jest

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
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
        window.location.href = '../pages/login.html';
    }
}
