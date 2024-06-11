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
    });

    function filterPosts(searchTerm) {
        const posts = postsContainer.getElementsByClassName('post');
        if (posts.length === 0) {
            console.warn('Keine Posts gefunden');
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
                    post.style.display = 'block';
                    contentElement.style.display = 'none';
                    window.location.href = `/Forum/src/html/pages/post-detail.html?id=${post.id}`;
                });
                searchResults.appendChild(resultItem);
                console.log('Suchergebnis hinzugefügt:', resultItem);
            }
        }
    }
});
