// src/js/home.js

document.addEventListener('DOMContentLoaded', function() {
    const addPostButton = document.getElementById('add-post');

    addPostButton.addEventListener('click', function() {
        const newPost = prompt('Bitte geben Sie den Beitragstext ein:');
        if (newPost) {
            const postContainer = document.getElementById('posts');
            const newPostElement = document.createElement('div');
            newPostElement.textContent = newPost;
            postContainer.appendChild(newPostElement);

            // Entferne den "Keine aktuellen Beiträge" Text
            const noPostsText = postContainer.querySelector('p');
            if (noPostsText) {
                noPostsText.remove();
            }
        }
    });
});
