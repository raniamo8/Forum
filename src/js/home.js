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
    const currentUser = localStorage.getItem('username'); // Benutzernamen laden
    const userRole = localStorage.getItem('userRole'); // Benutzerrolle laden
    let posts = []; // Array zum Speichern von Posts

    // Check if the user is an admin and show the announcement button
    if (userRole === 'admin') {
        createAnnouncementBtn.classList.remove('hidden');
    }

    createPostBtn.addEventListener('click', function() {
        console.log('Post erstellen Button geklickt'); // Debugging-Log
        postCreationForm.style.display = postCreationForm.style.display === 'none' || postCreationForm.style.display === '' ? 'block' : 'none';
        announcementCreationForm.style.display = 'none'; // Hide announcement form if post form is shown
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
                isAnnouncement: false
            };
            posts.push(post);
            localStorage.setItem('allPosts', JSON.stringify(posts)); // Alle Posts im localStorage speichern
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

    createAnnouncementBtn.addEventListener('click', function() {
        console.log('Ankündigung erstellen Button geklickt'); // Debugging-Log
        announcementCreationForm.style.display = announcementCreationForm.style.display === 'none' || announcementCreationForm.style.display === '' ? 'block' : 'none';
        postCreationForm.style.display = 'none'; // Hide post form if announcement form is shown
        console.log('Form visibility toggled'); // Debugging-Log
    });

    submitAnnouncementBtn.addEventListener('click', function() {
        const content = announcementContent.value;
        const attachments = announcementAttachment.files;
        const title = announcementTitle.value;
        const date = new Date().toLocaleString();
        console.log('Submit Announcement Button geklickt'); // Debugging-Log
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
            posts.unshift(post); // Add announcement at the beginning
            localStorage.setItem('allPosts', JSON.stringify(posts)); // Alle Posts im localStorage speichern
            renderPosts(); // Re-render all posts to show the new announcement at the top
            announcementContent.value = ""; // Clear the textarea
            announcementTitle.value = ""; // Clear the title input
            announcementAttachment.value = ""; // Clear the file input
            announcementCreationForm.style.display = 'none'; // Hide the form
            console.log('Announcement created', post); // Debugging-Log
        } else {
            alert("Titel und Inhalt dürfen nicht leer sein.");
            console.log('Announcement content or title empty'); // Debugging-Log
        }
    });

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
            console.log('Post clicked', post); // Debugging-Log
            localStorage.setItem('currentPost', JSON.stringify(post)); // Speichern des aktuellen Posts
            window.location.href = '/Forum/src/html/pages/post-detail.html'; // Absoluter Pfad
        });
        postsContainer.appendChild(postElement);
    }

    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach(renderPost);
    }

    // Laden der gespeicherten Posts beim Start
    const storedPosts = localStorage.getItem('allPosts');
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
        renderPosts();
    }
});
