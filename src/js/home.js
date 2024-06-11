// src/js/home.js
document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('create-post-btn');
    const postCreationForm = document.getElementById('post-creation-form');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const postsContainer = document.getElementById('posts-container');
    const postAttachment = document.getElementById('post-attachment');
    const postTitle = document.getElementById('post-title');
    const currentUser = localStorage.getItem('username'); // Benutzernamen laden
    let posts = JSON.parse(localStorage.getItem('posts')) || []; // Array zum Speichern von Posts

    createPostBtn.addEventListener('click', function() {
        console.log('Post erstellen Button geklickt'); // Debugging-Log
        postCreationForm.style.display = postCreationForm.style.display === 'none' || postCreationForm.style.display === '' ? 'block' : 'none';
        console.log('Form visibility toggled'); // Debugging-Log
    });

    submitPostBtn.addEventListener('click', function() {
        const postContent = document.getElementById('post-content').value;
        const attachments = postAttachment.files;
        const title = postTitle.value;
        const date = new Date().toLocaleString();
        console.log('Submit Post Button geklickt'); // Debugging-Log
        if (title.trim() !== "" && postContent.trim() !== "") {
            const post = {
                id: posts.length,
                title,
                content: postContent,
                author: currentUser,
                date,
                attachments: Array.from(attachments),
            };
            posts.push(post);
            localStorage.setItem('posts', JSON.stringify(posts)); // Speichern der Posts im localStorage
            renderPost(post);
            document.getElementById('post-content').value = ""; // Clear the textarea
            postTitle.value = ""; // Clear the title input
            postAttachment.value = ""; // Clear the file input
            postCreationForm.style.display = 'none'; // Hide the form
            console.log('Post created', post); // Debugging-Log
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
            console.log('Post content or title empty'); // Debugging-Log
        }
    });

    function renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p class="post-title">${post.title}</p>
            <div class="post-details">
                <p>${post.content}</p>
                <p>Autor: ${post.author}</p>
                <p>Datum: ${post.date}</p>
            </div>
        `;
        postElement.addEventListener('click', function() {
            console.log('Post clicked', post); // Debugging-Log
            localStorage.setItem('currentPost', JSON.stringify(post)); // Speichern des aktuellen Posts
            window.location.href = '/Forum/src/html/pages/post-detail.html'; // Absoluter Pfad
        });
        postsContainer.appendChild(postElement);
    }

    // Render existing posts on page load
    posts.forEach(renderPost);
});
