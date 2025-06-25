// ========== Variables ==========
let users = JSON.parse(localStorage.getItem("users")) || {};
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = localStorage.getItem("currentUser") || null;
const ADMIN_USER = "admin";

// ========== Authentication ==========
function signup() {
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value;
  if (!username || !password) return displayAuth("Fill in both fields.");

  if (users[username]) {
    displayAuth("User already exists.");
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    displayAuth("Account created. Now log in.");
  }
}

function login() {
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  if (users[username] === password) {
    currentUser = username;
    localStorage.setItem("currentUser", currentUser);
    displayAuth("");
    showApp();
  } else {
    displayAuth("Invalid login.");
  }
}

function displayAuth(msg) {
  document.getElementById("authMessage").textContent = msg;
}

// ========== UI ==========
function showApp() {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("mainNav").classList.remove("hidden");
  showPage("home");

  const status = currentUser === ADMIN_USER ? "🛡️ Admin" : "🟢 Online";
  document.getElementById("userStatus").textContent = `Logged in as ${currentUser} ${status}`;

  renderPosts();
}

// ========== Page Navigation ==========
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(`${pageId}Page`).classList.remove("hidden");
}

// ========== Post Handling ==========
function submitPost() {
  const content = document.getElementById("postContent").value.trim();
  if (!content) return;

  const newPost = {
    id: Date.now(),
    author: currentUser,
    message: content,
    timestamp: new Date().toLocaleString(),
    likes: 0,
    comments: []
  };

  posts.unshift(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById("postContent").value = "";
  renderPosts();
}

function likePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes++;
    saveAndRender();
  }
}

function deletePost(id) {
  posts = posts.filter(p => p.id !== id);
  saveAndRender();
}

function addComment(id, text) {
  const post = posts.find(p => p.id === id);
  if (post && text.trim()) {
    post.comments.push({ author: currentUser, text: text.trim() });
    saveAndRender();
  }
}

function renderPosts(filteredPosts = posts) {
  const container = document.getElementById("postFeed");
  container.innerHTML = "";

  filteredPosts.forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");

    const canDelete = currentUser === ADMIN_USER;
    let commentsHTML = "";
    post.comments.forEach(c => {
      commentsHTML += `<p><strong>${c.author}:</strong> ${c.text}</p>`;
    });

    div.innerHTML = `
      <strong>${post.author}</strong> <small>${post.timestamp}</small>
      <p>${post.message}</p>

      <button onclick="likePost(${post.id})">❤️ ${post.likes}</button>
      ${canDelete ? `<button onclick="deletePost(${post.id})">🗑️</button>` : ""}

      <div class="comment-box">
        <input type="text" placeholder="Add a comment..." onkeydown="if(event.key==='Enter') addComment(${post.id}, this.value)">
      </div>
      <div class="comments">${commentsHTML}</div>
    `;
    container.appendChild(div);
  });
}

function saveAndRender() {
  localStorage.setItem("posts", JSON.stringify(posts));
  filterPosts();
}

// ========== Filtering ==========
function filterPosts() {
  const query = document.getElementById("filterInput").value.toLowerCase();
  const filtered = posts.filter(post =>
    post.author.toLowerCase().includes(query) ||
    post.message.toLowerCase().includes(query)
  );
  renderPosts(filtered);
}

// ========== Auto-login ==========
if (currentUser) showApp();