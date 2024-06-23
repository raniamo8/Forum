/**
 * @file Manages the functionality of the home page, including creating posts and announcements,
 * rendering posts, and handling user interactions.
 */

document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('create-post-btn');
    const cancelPostBtn = document.getElementById('cancel-post-btn');
    const postCreationForm = document.getElementById('post-creation-form');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const postsContainer = document.getElementById('posts-container');
    const postAttachment = document.getElementById('post-attachment');
    const postTitle = document.getElementById('post-title');
    const postCategory = document.getElementById('post-category');
    const createAnnouncementBtn = document.getElementById('create-announcement-btn');
    const cancelAnnouncementBtn = document.getElementById('cancel-announcement-btn');
    const announcementCreationForm = document.getElementById('announcement-creation-form');
    const submitAnnouncementBtn = document.getElementById('submit-announcement-btn');
    const announcementTitle = document.getElementById('announcement-title');
    const announcementContent = document.getElementById('announcement-content');
    const announcementCategory = document.getElementById('announcement-category');
    const announcementAttachment = document.getElementById('announcement-attachment');
    const categoryFilter = document.getElementById('category-filter');
    const currentUser = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    let posts = JSON.parse(localStorage.getItem('allPosts')) || [];

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
    cancelPostBtn.addEventListener('click', function() {
        postCreationForm.style.display = 'none';
    });

    /**
     * Handles the submission of a new post.
     */
    submitPostBtn.addEventListener('click', function() {
        const postContent = document.getElementById('post-content').value;
        const attachments = postAttachment.files;
        const title = postTitle.value;
        const category = postCategory.value;
        const date = new Date().toISOString(); // Save date as ISO string for sorting
        if (title.trim() !== "" && postContent.trim() !== "" && category !== "") {
            const post = {
                id: posts.length,
                title,
                content: postContent,
                author: currentUser,
                date,
                category,
                attachments: Array.from(attachments),
                isAnnouncement: false,
                comments: []  // Initial empty comments array
            };
            posts.push(post);
            localStorage.setItem('allPosts', JSON.stringify(posts));
            renderPosts(); // Re-render all posts
            document.getElementById('post-content').value = "";
            postTitle.value = "";
            postCategory.value = "";
            postAttachment.value = "";
            postCreationForm.style.display = 'none';
        } else {
            alert("Titel, Inhalt und Kategorie dürfen nicht leer sein.");
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
    cancelAnnouncementBtn.addEventListener('click', function() {
        announcementCreationForm.style.display = 'none';
    });

    /**
     * Handles the submission of a new announcement.
     */
    submitAnnouncementBtn.addEventListener('click', function() {
        const content = announcementContent.value;
        const attachments = announcementAttachment.files;
        const title = announcementTitle.value;
        const category = announcementCategory.value;
        const date = new Date().toISOString(); // Save date as ISO string for sorting
        if (title.trim() !== "" && content.trim() !== "" && category !== "") {
            const post = {
                id: posts.length,
                title,
                content,
                author: currentUser,
                date,
                category,
                attachments: Array.from(attachments),
                isAnnouncement: true
            };
            posts.push(post); // Add announcement at the beginning
            localStorage.setItem('allPosts', JSON.stringify(posts));
            renderPosts(); // Re-render all posts to show the new announcement at the top
            announcementContent.value = "";
            announcementTitle.value = "";
            announcementCategory.value = "";
            announcementAttachment.value = "";
            announcementCreationForm.style.display = 'none';
        } else {
            alert("Titel, Inhalt und Kategorie dürfen nicht leer sein.");
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
     * @param {string} post.category - The category of the post.
     */
    function renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p class="post-title">
                ${post.isAnnouncement ? '<i class="fa-solid fa-bullhorn"></i>' : '<i class="fa-solid fa-note-sticky"></i>'}
                ${post.title}
            </p>
            <p class="post-meta">
                ${post.isAnnouncement ? '<i class="fa-solid fa-bullhorn"></i>' : '<i class="fa-solid fa-note-sticky"></i>'}
                Autor: ${post.author} | Datum: ${new Date(post.date).toLocaleString('de-DE')} | Kategorie: ${post.category}
            </p>
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
        const filteredCategory = categoryFilter.value;
        posts
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort posts by date in descending order
            .filter(post => filteredCategory === "" || post.category === filteredCategory) // Filter by category
            .forEach(renderPost);
    }

    /**
     * Loads posts from localStorage and renders them.
     */
    renderPosts();

    /**
     * Adds event listener to the category filter.
     */
    categoryFilter.addEventListener('change', function() {
        renderPosts();
    });
});
