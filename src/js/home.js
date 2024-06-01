// src/js/home.js
document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('create-post-btn');
    const postCreationForm = document.getElementById('post-creation-form');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const postsContainer = document.getElementById('posts-container');

    createPostBtn.addEventListener('click', function() {
        console.log('Post erstellen Button geklickt'); // Debugging-Log
        if (postCreationForm.style.display === 'none' || postCreationForm.style.display === '') {
            postCreationForm.style.display = 'block';
        } else {
            postCreationForm.style.display = 'none';
        }
        console.log('Form visibility toggled'); // Debugging-Log
    });

    submitPostBtn.addEventListener('click', function() {
        const postContent = document.getElementById('post-content').value;
        if (postContent.trim() !== "") {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `<p>${postContent}</p>`;
            postsContainer.appendChild(postElement);
            document.getElementById('post-content').value = ""; // Clear the textarea
            postCreationForm.style.display = 'none'; // Hide the form
            alert("Post erfolgreich erstellt!"); // Erfolgsmeldung
        } else {
            alert("Der Beitrag darf nicht leer sein.");
        }
    });
});
