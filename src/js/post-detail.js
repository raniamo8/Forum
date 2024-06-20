/**
 * @file Manages the display and interaction with post details, including editing, deleting, liking, and commenting on posts.
 */

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
    let editCommentForm = null;

    if (currentPost) {
        renderPostDetails(currentPost);
        if (currentPost.comments) {
            currentPost.comments.forEach(comment => renderComment(comment));
        }
    }

    /**
     * Renders the details of a post.
     * @param {Object} post - The post object to be rendered.
     */
    function renderPostDetails(post) {
        postDetailsContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Autor: ${post.author}</p>
            <p id="post-date">Datum: ${new Date(post.date).toLocaleString('de-DE')}</p>
            ${post.attachments.length > 0 ? renderAttachments(post.attachments) : ''}
            <div class="post-actions">
                <i class="fa-solid fa-pen-to-square" id="edit-post-btn"></i>
                <i class="fa-solid fa-trash-can" id="delete-post-btn"></i>
                <i class="fa-solid fa-thumbs-up" id="like-button"></i>
                <span id="like-count">${post.likes ? post.likes.length : 0}</span>
                <i class="fa-solid fa-comment" id="comment-post-btn"></i>
            </div>
        `;
        document.getElementById('edit-post-btn').addEventListener('click', function() {
            editPost(post);
        });
        document.getElementById('delete-post-btn').addEventListener('click', function() {
            deletePost(post.id);
        });
        document.getElementById('like-button').addEventListener('click', function() {
            toggleLikePost(post);
        });
        document.getElementById('comment-post-btn').addEventListener('click', function() {
            toggleCommentForm();
        });
    }

    /**
     * Renders the attachments of a post.
     * @param {Array} attachments - Array of attachment objects.
     * @returns {string} - HTML string for the attachments.
     */
    function renderAttachments(attachments) {
        return `
            <ul>
                ${attachments.map(attachment => `<li>${attachment.name}</li>`).join('')}
            </ul>
        `;
    }

    /**
     * Handles the editing of a post.
     * @param {Object} post - The post object to be edited.
     */
    function editPost(post) {
        editPostTitle.value = post.title;
        editPostContent.value = post.content;
        editPostAttachment.value = ""; // Clear the file input
        editPostForm.style.display = 'block'; // Zeige das Bearbeitungsformular
    }

    /**
     * Saves the edited post.
     */
    saveEditBtn.addEventListener('click', function() {
        const newTitle = editPostTitle.value;
        const newContent = editPostContent.value;
        const newAttachments = editPostAttachment.files;
        const newDate = new Date().toISOString();
        if (newTitle.trim() !== "" && newContent.trim() !== "") {
            currentPost.title = newTitle;
            currentPost.content = newContent;
            currentPost.date = newDate; // Update the date
            if (newAttachments.length > 0) {
                currentPost.attachments = Array.from(newAttachments);
            }

            // Update the post in the allPosts array in localStorage
            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
            if (postIndex !== -1) {
                allPosts[postIndex] = currentPost;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
            postDetailsContainer.innerHTML = ''; // Clear the post details container
            renderPostDetails(currentPost); // Re-render the post details
            editPostForm.style.display = 'none'; // Verstecke das Bearbeitungsformular
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
        }
    });

    /**
     * Deletes a post.
     * @param {number} postId - The ID of the post to be deleted.
     */
    function deletePost(postId) {
        if (confirm('Bist du sicher, dass du diesen Post löschen möchtest?')) {
            let allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            allPosts = allPosts.filter(post => post.id !== postId);
            localStorage.setItem('allPosts', JSON.stringify(allPosts));
            localStorage.removeItem('currentPost');
            window.location.href = 'home.html';
        }
    }

    /**
     * Submits a new comment.
     */
    submitCommentBtn.addEventListener('click', function() {
        const commentText = commentContent.value;
        const commentDate = new Date().toISOString();
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

            // Update the post in the allPosts array in localStorage
            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
            if (postIndex !== -1) {
                allPosts[postIndex].comments = currentPost.comments;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
            renderComment(comment);
            commentContent.value = ""; // Clear the textarea
            commentContent.style.display = 'none'; // Kommentarformular ausblenden
            submitCommentBtn.style.display = 'none'; // Kommentar-Button ausblenden
        } else {
            alert("Kommentar darf nicht leer sein.");
        }
    });

    /**
     * Deletes a comment.
     * @param {Object} comment - The comment object to be deleted.
     */
    function deleteComment(comment) {
        if (confirm('Bist du sicher, dass du diesen Kommentar löschen möchtest?')) {
            currentPost.comments = currentPost.comments.filter(c => c !== comment);

            // Update the post in the allPosts array in localStorage
            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
            if (postIndex !== -1) {
                allPosts[postIndex].comments = currentPost.comments;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
            commentsContainer.innerHTML = ''; // Clear the comments container
            currentPost.comments.forEach(renderComment); // Re-render all comments
        }
    }

    /**
     * Renders a comment.
     * @param {Object} comment - The comment object to be rendered.
     */
    function renderComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p>${comment.content}</p>
            <p class="comment-author">Autor: ${comment.author}</p>
            <p class="comment-date">Datum: ${new Date(comment.date).toLocaleString('de-DE')}</p>
            <div class="comment-actions">
                <i class="fa-solid fa-pen-to-square edit-comment-btn"></i>
                <i class="fa-solid fa-trash-can delete-comment-btn"></i>
            </div>
        `;
        commentElement.querySelector('.edit-comment-btn').addEventListener('click', function() {
            editComment(comment, commentElement);
        });
        commentElement.querySelector('.delete-comment-btn').addEventListener('click', function() {
            deleteComment(comment);
        });
        commentsContainer.appendChild(commentElement);
    }

    /**
     * Edits a comment.
     * @param {Object} comment - The comment object to be edited.
     * @param {HTMLElement} commentElement - The DOM element of the comment.
     */
    function editComment(comment, commentElement) {
        // Ensure only one edit form is open at a time
        if (editCommentForm) {
            editCommentForm.remove();
        }

        const editForm = document.createElement('div');
        editForm.className = 'comment-edit-form';
        editForm.innerHTML = `
            <textarea class="edit-comment-content">${comment.content}</textarea>
            <button class="save-comment-btn btn btn-primary small-btn">Speichern</button>
        `;
        commentElement.appendChild(editForm);
        editCommentForm = editForm;

        const saveCommentBtn = editForm.querySelector('.save-comment-btn');
        saveCommentBtn.addEventListener('click', function() {
            const newContent = editForm.querySelector('.edit-comment-content').value;
            if (newContent.trim() !== "") {
                comment.content = newContent;
                comment.date = new Date().toISOString(); // Update the date

                // Update the post in the allPosts array in localStorage
                const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
                const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
                if (postIndex !== -1) {
                    allPosts[postIndex].comments = currentPost.comments;
                    localStorage.setItem('allPosts', JSON.stringify(allPosts));
                }

                localStorage.setItem('currentPost', JSON.stringify(currentPost)); // Aktualisieren des aktuellen Posts im localStorage
                commentsContainer.innerHTML = ''; // Clear the comments container
                currentPost.comments.forEach(renderComment); // Re-render all comments
                editCommentForm = null;
            } else {
                alert("Kommentar darf nicht leer sein.");
            }
        });
    }

    /**
     * Toggles the like status of a post.
     * @param {Object} post - The post object to be liked/unliked.
     */
    function toggleLikePost(post) {
        if (!post.likes) {
            post.likes = [];
        }

        const userIndex = post.likes.indexOf(currentUser);
        if (userIndex === -1) {
            post.likes.push(currentUser);
        } else {
            post.likes.splice(userIndex, 1);
        }

        localStorage.setItem('currentPost', JSON.stringify(post)); // Aktualisieren des aktuellen Posts im localStorage
        document.getElementById('like-count').textContent = post.likes.length;
        document.getElementById('like-button').className = userIndex === -1 ? 'fa-solid fa-thumbs-up liked' : 'fa-solid fa-thumbs-up';
    }

    /**
     * Checks if the current user has liked the post.
     * @param {Object} post - The post object to check.
     * @returns {boolean} - True if the user has liked the post, false otherwise.
     */
    function hasUserLikedPost(post) {
        if (!post.likes) {
            post.likes = [];
        }
        return post.likes.includes(currentUser);
    }

    /**
     * Toggles the visibility of the comment form.
     */
    function toggleCommentForm() {
        const isVisible = commentContent.style.display === 'block';
        commentContent.style.display = isVisible ? 'none' : 'block';
        submitCommentBtn.style.display = isVisible ? 'none' : 'block';
    }
});
