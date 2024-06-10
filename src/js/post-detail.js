// src/js/post-detail.js
document.addEventListener('DOMContentLoaded', function() {
    const postDetailsContainer = document.getElementById('post-details');
    const editPostForm = document.getElementById('post-editing-form');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const editPostTitle = document.getElementById('edit-post-title');
    const editPostContent = document.getElementById('edit-post-content');
    const editPostAttachment = document.getElementById('edit-post-attachment');
    const currentPost = JSON.parse(localStorage.getItem('currentPost')); // Laden des aktuellen Posts
    const commentContent = document.getElementById('comment-content');
    const submitCommentBtn = document.getElementById('submit-comment-btn');
    const commentsContainer = document.getElementById('comments-container');
    const currentUser = localStorage.getItem('username'); // Benutzernamen laden

    if (currentPost) {
        renderPostDetails(currentPost);
        if (currentPost.comments) {
            currentPost.comments.forEach(comment => renderComment(comment));
        }
    }

    function renderPostDetails(post) {
        postDetailsContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Autor: ${post.author}</p>
            <p id="post-date">Datum: ${post.date}</p>
            ${post.attachments.length > 0 ? renderAttachments(post.attachments) : ''}
            <button id="edit-post-btn" class="btn btn-primary small-btn">Bearbeiten</button>
            <button id="delete-post-btn" class="btn btn-danger small-btn">Löschen</button>
        `;
        document.getElementById('edit-post-btn').addEventListener('click', function() {
            editPost(post);
        });
        document.getElementById('delete-post-btn').addEventListener('click', function() {
            deletePost(post.id);
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

    function deletePost(postId) {
        if (confirm('Bist du sicher, dass du diesen Post löschen möchtest?')) {
            console.log('Delete Post Button geklickt', postId); // Debugging-Log
            localStorage.removeItem('currentPost'); // Entfernen des aktuellen Posts aus dem localStorage
            window.location.href = 'home.html'; // Weiterleitung zur Homepage
        }
    }

    submitCommentBtn.addEventListener('click', function() {
        const commentText = commentContent.value;
        const commentDate = new Date().toLocaleString();
        if (commentText.trim() !== "") {
            const comment = {
                author: currentUser,
                date: commentDate,
                content: commentText
            };
            if (!currentPost.comments) {
                currentPost.comments = [];
            }
            currentPost.comments.push(comment);
            localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
            renderComment(comment);
            commentContent.value = ""; // Clear the textarea
            console.log('Comment added', comment); // Debugging-Log
        } else {
            alert("Kommentar darf nicht leer sein.");
            console.log('Comment empty'); // Debugging-Log
        }
    });

    function renderComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p>${comment.content}</p>
            <p class="comment-author">Autor: ${comment.author}</p>
            <p class="comment-date">Datum: ${comment.date}</p>
            <button class="delete-comment-btn btn btn-danger small-btn">Löschen</button>
        `;
        commentElement.querySelector('.delete-comment-btn').addEventListener('click', function() {
            deleteComment(comment);
        });
        commentsContainer.appendChild(commentElement);
    }

    function deleteComment(comment) {
        if (confirm('Bist du sicher, dass du diesen Kommentar löschen möchtest?')) {
            currentPost.comments = currentPost.comments.filter(c => c !== comment);
            localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
            commentsContainer.innerHTML = ''; // Clear the comments container
            currentPost.comments.forEach(renderComment); // Re-render all comments
            console.log('Comment deleted', comment); // Debugging-Log
        }
    }
});
