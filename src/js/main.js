//TODO: Kommentar Bug, wenn zweimal geklickt wird
//TODO: Löschfunktion Bug bei Posts
//TODO: Logik von der Anordung von den Posts nachhacken
//TODO: Logik von Post Speicherung nachhacken
//TODO: Post container farbe als blau und Cursor Form Änderung
//TODO: Mehr Details auf der Homepage bei den Posts
//TODO: Ankündigung Funktion bei user und admin unterscheiden
//TODO: Logout Funktion implementieren
//TODO: Main als Startpunkt für den Server
//TODO: Funktion Beitrag als abgeschlossen
//TODO: Medien hochladen, bearbeiten, löschen, anklicken und downloaden
//TODO: Tag und Category
//TODO: jest
//TODO: Sind Automatische UI Tests für JavaScript möglich?

document.addEventListener('DOMContentLoaded', function() {
    // Header laden

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
