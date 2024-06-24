/**
 * @file Handles the search functionality for filtering and displaying posts based on the search term input.
 */

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const postsContainer = document.getElementById('posts-container'); // Container for posts
    const searchResults = document.getElementById('search-results'); // Container for search results

    if (!searchInput) {
        console.error('Suchleiste nicht gefunden');
        return;
    }

    if (!searchResults) {
        console.error('Suchergebnisse-Container nicht gefunden');
        return;
    }

    console.log('Suchleiste und Suchergebnisse-Container gefunden');

    if (!postsContainer) {
        console.warn('Posts-Container nicht gefunden. Verwende localStorage für die Suchfunktion.');
    } else {
        console.log('Posts-Container gefunden');
    }

    /**
     * Event listener for search input to filter posts based on the search term.
     */
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        console.log('Suchbegriff:', searchTerm);
        filterPosts(searchTerm);
    });

    /**
     * Filters posts based on the search term and updates the search results.
     * @param {string} searchTerm - The term to filter posts by.
     */
    function filterPosts(searchTerm) {
        let posts = [];

        if (postsContainer) {
            posts = Array.from(postsContainer.getElementsByClassName('post'));
        } else {
            const storedPosts = localStorage.getItem('allPosts');
            if (storedPosts) {
                posts = JSON.parse(storedPosts);
            }
        }

        if (posts.length === 0) {
            console.warn('Keine Posts gefunden');
            searchResults.innerHTML = ''; // Clear previous search results if no posts found
            return;
        }

        console.log('Anzahl der Posts:', posts.length);
        searchResults.innerHTML = ''; // Clear previous search results

        posts.forEach(post => {
            let title = '';
            let content = '';

            if (postsContainer) {
                const titleElement = post.querySelector('.post-title');
                const contentElement = post.querySelector('.post-meta');

                if (!titleElement) {
                    console.error('Post-Titel nicht gefunden', post);
                    return;
                }

                if (!contentElement) {
                    console.error('Post-Inhalt nicht gefunden', post);
                    return;
                }

                title = titleElement.innerText.toLowerCase();
                content = contentElement.innerText.toLowerCase();
            } else {
                title = post.title.toLowerCase();
                content = post.content.toLowerCase();
            }

            console.log('Post-Titel:', title);
            console.log('Post-Inhalt:', content);

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerText = title.charAt(0).toUpperCase() + title.slice(1);
                resultItem.addEventListener('click', function() {
                    console.log('Suchergebnis angeklickt:', title);
                    if (postsContainer) {
                        post.click(); // Simulate click on the post to trigger the same logic
                    } else {
                        localStorage.setItem('currentPost', JSON.stringify(post)); // Save the current post
                        window.location.href = '/Forum/src/html/pages/post-detail.html';
                    }
                });
                searchResults.appendChild(resultItem);
                console.log('Suchergebnis hinzugefügt:', resultItem);
            }
        });

        if (searchResults.innerHTML === '') {
            searchResults.style.display = 'none'; // Hide dropdown if no results found
        } else {
            searchResults.style.display = 'block'; // Show dropdown if results found
        }

        if (searchTerm === '') {
            searchResults.style.display = 'none'; // Hide dropdown if search term is cleared
        }
    }

    /**
     * Event listener for clicks outside the search input and results to close the dropdown.
     */
    document.addEventListener('click', function(event) {
        const isClickInside = searchInput.contains(event.target) || searchResults.contains(event.target);
        if (!isClickInside) {
            searchResults.style.display = 'none';
            searchInput.value = '';
            console.log('Klick außerhalb des Suchfelds und der Dropdown-Liste, Dropdown geschlossen und Suchfeld geleert');
        }
    });

    /**
     * Prevents clicks inside the search input and results from closing the dropdown.
     */
    searchInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    searchResults.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
