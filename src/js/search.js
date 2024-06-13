// src/js/search.js
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const postsContainer = document.getElementById('posts-container'); // Container, der die Posts enthält
    const searchResults = document.getElementById('search-results'); // Container für Suchergebnisse

    if (!searchInput) {
        console.error('Suchleiste nicht gefunden');
        return;
    }

    if (!postsContainer) {
        console.error('Posts-Container nicht gefunden');
        return;
    }

    console.log('Suchleiste und Posts-Container gefunden');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        console.log('Suchbegriff:', searchTerm);
        filterPosts(searchTerm);

        // Dynamische Anpassung der Größe und Position des Dropdowns
        searchResults.style.width = `${searchInput.offsetWidth}px`;
        searchResults.style.left = `${searchInput.getBoundingClientRect().left}px`;
        searchResults.style.top = `${searchInput.getBoundingClientRect().bottom}px`;
    });

    function filterPosts(searchTerm) {
        const posts = postsContainer.getElementsByClassName('post');
        if (posts.length === 0) {
            console.warn('Keine Posts gefunden');
            searchResults.innerHTML = ''; // Clear previous search results if no posts found
            return;
        }

        console.log('Anzahl der Posts:', posts.length);
        searchResults.innerHTML = ''; // Clear previous search results

        for (let post of posts) {
            const titleElement = post.querySelector('.post-title');
            const contentElement = post.querySelector('.post-details');

            if (!titleElement) {
                console.error('Post-Titel nicht gefunden', post);
                continue;
            }

            if (!contentElement) {
                console.error('Post-Inhalt nicht gefunden', post);
                continue;
            }

            const title = titleElement.innerText.toLowerCase();
            const content = contentElement.innerText.toLowerCase();
            console.log('Post-Titel:', title);
            console.log('Post-Inhalt:', content);

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerText = titleElement.innerText;
                resultItem.addEventListener('click', function() {
                    console.log('Suchergebnis angeklickt:', post);
                    localStorage.setItem('currentPost', JSON.stringify(post)); // Speichern des aktuellen Posts
                    window.location.href = '/Forum/src/html/pages/post-detail.html';
                });
                searchResults.appendChild(resultItem);
                console.log('Suchergebnis hinzugefügt:', resultItem);
            }
        }

        if (searchResults.innerHTML === '') {
            searchResults.style.display = 'none'; // Dropdown-Menü ausblenden, wenn keine Ergebnisse gefunden wurden
        } else {
            searchResults.style.display = 'block'; // Dropdown-Menü anzeigen, wenn Ergebnisse gefunden wurden
        }

        if (searchTerm === '') {
            searchResults.style.display = 'none'; // Dropdown-Menü ausblenden, wenn der Suchbegriff gelöscht wird
        }
    }
});
