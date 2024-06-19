/**
 * @file Manages the functionality of the home page, including creating posts and announcements,
 * rendering posts, and handling user interactions.
 */

document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('create-post-btn');
    const closePostFormBtn = document.getElementById('close-post-form');
    const postCreationForm = document.getElementById('post-creation-form');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const postsContainer = document.getElementById('posts-container');
    const postAttachment = document.getElementById('post-attachment');
    const postTitle = document.getElementById('post-title');
    const createAnnouncementBtn = document.getElementById('create-announcement-btn');
    const closeAnnouncementFormBtn = document.getElementById('close-announcement-form');
    const announcementCreationForm = document.getElementById('announcement-creation-form');
    const submitAnnouncementBtn = document.getElementById('submit-announcement-btn');
    const announcementTitle = document.getElementById('announcement-title');
    const announcementContent = document.getElementById('announcement-content');
    const announcementAttachment = document.getElementById('announcement-attachment');
    const currentUser = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    let posts = [];

    // Check if the user is an admin and show the announcement button
    if (userRole === 'admin') {
        createAnnouncementBtn.classList.remove('hidden');
    }

    /**
     * Toggles the visibility of the post creation form.
     */
    createPostBtn.addEventListener('click', function() {
        postCreationForm.style.display = postCreationForm.style.display === 'none' || postCreationForm.style.display === '' ? 'block' : 'none';
        announcementCreationForm.style.display = 'none';
    });

    /**
     * Closes the post creation form.
     */
    closePostFormBtn.addEventListener('click', function() {
        postCreationForm.style.display = 'none';
    });

    /**
     * Handles the submission of a new post.
     */
    submitPostBtn.addEventListener('click', function() {
        const postContent = document.getElementById('post-content').value;
        const attachments = postAttachment.files;
        const title = postTitle.value;
        const date = new Date().toLocaleString();
        if (title.trim() !== "" && postContent.trim() !== "") {
            const post = {
                id: posts.length,
                title,
                content: postContent,
                author: currentUser,
                date,
                attachments: Array.from(attachments),
                isAnnouncement: false
            };
            posts.push(post);
            localStorage.setItem('allPosts', JSON.stringify(posts));
            renderPost(post);
            document.getElementById('post-content').value = "";
            postTitle.value = "";
            postAttachment.value = "";
            postCreationForm.style.display = 'none';
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
        }
    });

    /**
     * Toggles the visibility of the announcement creation form.
     */
    createAnnouncementBtn.addEventListener('click', function() {
        announcementCreationForm.style.display = announcementCreationForm.style.display === 'none' || announcementCreationForm.style.display === '' ? 'block' : 'none';
        postCreationForm.style.display = 'none';
    });

    /**
     * Closes the announcement creation form.
     */
    closeAnnouncementFormBtn.addEventListener('click', function() {
        announcementCreationForm.style.display = 'none';
    });

    /**
     * Handles the submission of a new announcement.
     */
    submitAnnouncementBtn.addEventListener('click', function() {
        const content = announcementContent.value;
        const attachments = announcementAttachment.files;
        const title = announcementTitle.value;
        const date = new Date().toLocaleString();
        if (title.trim() !== "" && content.trim() !== "") {
            const post = {
                id: posts.length,
                title,
                content,
                author: currentUser,
                date,
                attachments: Array.from(attachments),
                isAnnouncement: true
            };
            posts.unshift(post);
            localStorage.setItem('allPosts', JSON.stringify(posts));
            renderPosts();
            announcementContent.value = "";
            announcementTitle.value = "";
            announcementAttachment.value = "";
            announcementCreationForm.style.display = 'none';
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
        }
    });

    /**
     * Renders a single post.
     * @param {Object} post - The post object.
     * @param {number} post.id - The ID of the post.
     * @param {string} post.title - The title of the post.
     * @param {string} post.content - The content of the post.
     * @param {string} post.author - The author of the post.
     * @param {string} post.date - The date the post was created.
     * @param {Array} post.attachments - The attachments of the post.
     * @param {boolean} post.isAnnouncement - Whether the post is an announcement.
     */
    function renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p class="post-title">${post.title} ${post.isAnnouncement ? '<i class="fa-solid fa-bookmark"></i>' : ''}</p>
            <p class="post-meta">Autor: ${post.author} | Datum: ${post.date}</p>
        `;
        postElement.addEventListener('click', function() {
            localStorage.setItem('currentPost', JSON.stringify(post));
            window.location.href = '/Forum/src/html/pages/post-detail.html';
        });
        postsContainer.appendChild(postElement);
    }

    /**
     * Renders all posts.
     */
    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach(renderPost);
    }

    /**
     * Loads posts from localStorage and renders them.
     */
    const storedPosts = localStorage.getItem('allPosts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
        renderPosts();
    }
});
