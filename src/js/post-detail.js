// src/js/post-detail.js
document.addEventListener('DOMContentLoaded', function() {
    const postDetailsContainer = document.getElementById('post-details');
    const editPostForm = document.getElementById('post-editing-form');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const editPostTitle = document.getElementById('edit-post-title');
    const editPostContent = document.getElementById('edit-post-content');
    const editPostAttachment = document.getElementById('edit-post-attachment');
    const currentPost = JSON.parse(localStorage.getItem('currentPost')); // Laden des aktuellen Posts

    if (currentPost) {
        renderPostDetails(currentPost);
    }

    function renderPostDetails(post) {
        postDetailsContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Autor: ${post.author}</p>
            <p id="post-date">Datum: ${post.date}</p>
            ${post.attachments.length > 0 ? renderAttachments(post.attachments) : ''}
            <button id="edit-post-btn" class="btn btn-primary small-btn">Bearbeiten</button>
        `;
        document.getElementById('edit-post-btn').addEventListener('click', function() {
            editPost(post);
        });
    }

    function renderAttachments(attachments) {
        return `
            <ul>
                ${attachments.map(attachment => `<li>${attachment.name}</li>`).join('')}
            </ul>
        `;
    }

    function editPost(post) {
        console.log('Edit Post Button geklickt', post); // Debugging-Log
        editPostTitle.value = post.title;
        editPostContent.value = post.content;
        editPostAttachment.value = ""; // Clear the file input
        editPostForm.style.display = 'block'; // Zeige das Bearbeitungsformular
    }

    saveEditBtn.addEventListener('click', function() {
        const newTitle = editPostTitle.value;
        const newContent = editPostContent.value;
        const newAttachments = editPostAttachment.files;
        const newDate = new Date().toLocaleString();
        if (newTitle.trim() !== "" && newContent.trim() !== "") {
            currentPost.title = newTitle;
            currentPost.content = newContent;
            currentPost.date = newDate; // Update the date
            if (newAttachments.length > 0) {
                currentPost.attachments = Array.from(newAttachments);
            }
            localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
            postDetailsContainer.innerHTML = ''; // Clear the post details container
            renderPostDetails(currentPost); // Re-render the post details
            editPostForm.style.display = 'none'; // Verstecke das Bearbeitungsformular
            console.log('Post edited', currentPost); // Debugging-Log
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
            console.log('Post content or title empty'); // Debugging-Log
        }
    });
});
