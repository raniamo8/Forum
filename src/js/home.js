/**
 * @file Manages the functionality of the home page, including creating posts and announcements,
 * rendering posts, and handling user interactions.
 */

document.addEventListener('DOMContentLoaded', function() {
    const createPostBtn = document.getElementById('create-post-btn');
    const postCreationForm = document.getElementById('post-creation-form');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const postsContainer = document.getElementById('posts-container');
    const postAttachment = document.getElementById('post-attachment');
    const postTitle = document.getElementById('post-title');
    const createAnnouncementBtn = document.getElementById('create-announcement-btn');
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
        console.log('Post erstellen Button geklickt');
        postCreationForm.style.display = postCreationForm.style.display === 'none' || postCreationForm.style.display === '' ? 'block' : 'none';
        announcementCreationForm.style.display = 'none';
        console.log('Form visibility toggled');
    });

    /**
     * Handles the submission of a new post.
     */
    submitPostBtn.addEventListener('click', function() {
        const postContent = document.getElementById('post-content').value;
        const attachments = postAttachment.files;
        const title = postTitle.value;
        const date = new Date().toLocaleString();
        console.log('Submit Post Button geklickt');
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
            console.log('Post created', post);
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
            console.log('Post content or title empty');
        }
    });

    /**
     * Toggles the visibility of the announcement creation form.
     */
    createAnnouncementBtn.addEventListener('click', function() {
        console.log('Ankündigung erstellen Button geklickt');
        announcementCreationForm.style.display = announcementCreationForm.style.display === 'none' || announcementCreationForm.style.display === '' ? 'block' : 'none';
        postCreationForm.style.display = 'none';
        console.log('Form visibility toggled');
    });

    /**
     * Handles the submission of a new announcement.
     */
    submitAnnouncementBtn.addEventListener('click', function() {
        const content = announcementContent.value;
        const attachments = announcementAttachment.files;
        const title = announcementTitle.value;
        const date = new Date().toLocaleString();
        console.log('Submit Announcement Button geklickt');
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
            console.log('Announcement created', post);
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
            console.log('Announcement content or title empty');
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
            <div class="post-details">
                <p>${post.content}</p>
                <p>Autor: ${post.author}</p>
                <p>Datum: ${post.date}</p>
            </div>
        `;
        postElement.addEventListener('click', function() {
            console.log('Post clicked', post);
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

    const storedPosts = localStorage.getItem('allPosts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
        renderPosts();
    }
});
