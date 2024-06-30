document.addEventListener('DOMContentLoaded', function() {
    const postDetailsContainer = document.getElementById('post-details');
    const postClosedInfo = document.getElementById('post-closed-info');
    const editPostForm = document.getElementById('post-editing-form');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const editPostTitle = document.getElementById('edit-post-title');
    const editPostContent = document.getElementById('edit-post-content');
    const editPostCategory = document.getElementById('edit-post-category');
    const commentContent = document.getElementById('comment-content');
    const submitCommentBtn = document.getElementById('submit-comment-btn');
    const commentsContainer = document.getElementById('comments-container');
    const currentUser = localStorage.getItem('username');
    const currentPost = JSON.parse(localStorage.getItem('currentPost'));
    let editCommentForm = null;

    if (currentPost) {
        console.log("Current post found:", currentPost);
        renderPostDetails(currentPost);
        if (currentPost.comments) {
            currentPost.comments.forEach(comment => renderComment(comment));
        }
        if (currentPost.closed) {
            console.log("Post is closed");
            lockPostFunctions();
            postClosedInfo.classList.remove('hidden');
        } else {
            console.log("Post is not closed");
            postClosedInfo.classList.add('hidden');
        }
    } else {
        console.log("No current post found");
    }

    function renderPostDetails(post) {
        console.log("Rendering post details:", post);
        postDetailsContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Autor: ${post.author}</p>
            <p id="post-date">Datum: ${new Date(post.date).toLocaleString('de-DE')}</p>
            <div class="post-actions">
                <i class="fa-solid fa-square-check" id="close-post-btn"></i>
                <i class="fa-solid fa-pen-to-square" id="edit-post-btn"></i>
                <i class="fa-solid fa-trash-can" id="delete-post-btn"></i>
                <i class="fa-solid fa-thumbs-up" id="like-button"></i>
                <span id="like-count">${post.likes ? post.likes.length : 0}</span>
            </div>
        `;
        document.getElementById('close-post-btn').addEventListener('click', function() {
            closePost(post);
        });
        document.getElementById('edit-post-btn').addEventListener('click', function() {
            editPost(post);
        });
        document.getElementById('delete-post-btn').addEventListener('click', function() {
            deletePost(post.id);
        });
        document.getElementById('like-button').addEventListener('click', function() {
            toggleLikePost(post);
        });
    }

    function editPost(post) {
        console.log("Editing post:", post);
        editPostTitle.value = post.title;
        editPostContent.value = post.content;
        editPostCategory.value = post.category || '';
        editPostForm.style.display = 'block';
    }

    saveEditBtn.addEventListener('click', function() {
        const newTitle = editPostTitle.value;
        const newContent = editPostContent.value;
        const newCategory = editPostCategory.value;
        const newDate = new Date().toISOString();
        if (newTitle.trim() !== "" && newContent.trim() !== "" && newCategory.trim() !== "") {
            currentPost.title = newTitle;
            currentPost.content = newContent;
            currentPost.date = newDate;
            currentPost.category = newCategory;

            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
            if (postIndex !== -1) {
                allPosts[postIndex] = currentPost;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(currentPost));
            postDetailsContainer.innerHTML = '';
            renderPostDetails(currentPost);
            editPostForm.style.display = 'none';
        } else {
            alert("Titel, Inhalt und Kategorie dürfen nicht leer sein.");
        }
    });

    cancelEditBtn.addEventListener('click', function() {
        editPostForm.style.display = 'none';
    });

    function deletePost(postId) {
        if (confirm('Bist du sicher, dass du diesen Post löschen möchtest?')) {
            let allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            allPosts = allPosts.filter(post => post.id !== postId);
            localStorage.setItem('allPosts', JSON.stringify(allPosts));
            localStorage.removeItem('currentPost');
            window.location.href = 'home.html';
        }
    }

    function closePost(post) {
        if (post.closed) {
            alert("Dieses Thema ist bereits abgeschlossen.");
            return;
        }
        if (confirm('Bist du sicher, dass du dieses Thema abschließen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.')) {
            post.closed = true;

            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(p => p.id === post.id);
            if (postIndex !== -1) {
                allPosts[postIndex] = post;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(post));
            lockPostFunctions();
            postClosedInfo.classList.remove('hidden');
        }
    }

    function lockPostFunctions() {
        console.log("Locking post functions");
        document.getElementById('edit-post-btn').style.display = 'none';
        document.getElementById('like-button').style.display = 'none';
        commentContent.style.display = 'none';
        submitCommentBtn.style.display = 'none';

        document.querySelectorAll('.edit-comment-btn').forEach(btn => btn.style.display = 'none');
        document.querySelectorAll('.delete-comment-btn').forEach(btn => btn.style.display = 'none');
    }

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

            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
            if (postIndex !== -1) {
                allPosts[postIndex].comments = currentPost.comments;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(currentPost));
            renderComment(comment);
            commentContent.value = "";
        } else {
            alert("Kommentar darf nicht leer sein.");
        }
    });

    function deleteComment(comment) {
        if (confirm('Bist du sicher, dass du diesen Kommentar löschen möchtest?')) {
            currentPost.comments = currentPost.comments.filter(c => c !== comment);

            const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
            const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
            if (postIndex !== -1) {
                allPosts[postIndex].comments = currentPost.comments;
                localStorage.setItem('allPosts', JSON.stringify(allPosts));
            }

            localStorage.setItem('currentPost', JSON.stringify(currentPost));
            commentsContainer.innerHTML = '';
            currentPost.comments.forEach(renderComment);
        }
    }

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

    function editComment(comment, commentElement) {
        if (editCommentForm) {
            editCommentForm.remove();
        }

        const editForm = document.createElement('div');
        editForm.className = 'comment-edit-form';
        editForm.innerHTML = `
            <textarea class="edit-comment-content comment-edit">${comment.content}</textarea>
            <button class="save-comment-btn btn btn-primary small-btn">Speichern</button>
        `;
        commentElement.appendChild(editForm);
        editCommentForm = editForm;

        const saveCommentBtn = editForm.querySelector('.save-comment-btn');
        saveCommentBtn.addEventListener('click', function() {
            const newContent = editForm.querySelector('.edit-comment-content').value;
            if (newContent.trim() !== "") {
                comment.content = newContent;
                comment.date = new Date().toISOString();

                const allPosts = JSON.parse(localStorage.getItem('allPosts')) || [];
                const postIndex = allPosts.findIndex(post => post.id === currentPost.id);
                if (postIndex !== -1) {
                    allPosts[postIndex].comments = currentPost.comments;
                    localStorage.setItem('allPosts', JSON.stringify(allPosts));
                }

                localStorage.setItem('currentPost', JSON.stringify(currentPost));
                commentsContainer.innerHTML = '';
                currentPost.comments.forEach(renderComment);
                editCommentForm = null;
            } else {
                alert("Kommentar darf nicht leer sein.");
            }
        });
    }

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

        localStorage.setItem('currentPost', JSON.stringify(post));
        document.getElementById('like-count').textContent = post.likes.length;
        document.getElementById('like-button').className = userIndex === -1 ? 'fa-solid fa-thumbs-up liked' : 'fa-solid fa-thumbs-up';
    }

    function hasUserLikedPost(post) {
        if (!post.likes) {
            post.likes = [];
        }
        return post.likes.includes(currentUser);
    }

    document.addEventListener('click', function(event) {
        const postOptionsMenu = document.getElementById('post-options-menu');
        if (postOptionsMenu && !postOptionsMenu.contains(event.target) && !event.target.matches('#post-options-btn')) {
            postOptionsMenu.classList.add('hidden');
        }
    });
});
