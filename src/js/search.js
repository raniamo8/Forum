document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const postsContainer = document.getElementById('posts-container'); // Container, der die Posts enthält

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        filterPosts(searchTerm);
    });

    function filterPosts(searchTerm) {
        const posts = postsContainer.getElementsByClassName('post');
        for (let post of posts) {
            const title = post.querySelector('.post-title').innerText.toLowerCase();
            const content = post.querySelector('.post-content').innerText.toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                post.style.display = 'block'; // Post anzeigen
                post.querySelector('.post-content').style.display = 'none'; // Nur den Titel anzeigen
            } else {
                post.style.display = 'none'; // Post ausblenden
            }
        }
    }
});
