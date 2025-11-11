// Blogging platform using localStorage (fully working frontend demo)

let isRegister = false;
let currentUser = localStorage.getItem("loggedInUser");

// Elements
const formTitle = document.getElementById("formTitle");
const switchText = document.getElementById("switchText");
const switchLink = document.getElementById("switchLink");
const authSubmit = document.getElementById("authSubmit");
const authSection = document.getElementById("authSection");
const postSection = document.getElementById("postSection");
const feedSection = document.getElementById("feedSection");
const logoutBtn = document.getElementById("logoutBtn");
const feed = document.getElementById("feed");

// Switch between login/register
switchLink.onclick = (e) => {
  e.preventDefault();
  isRegister = !isRegister;
  formTitle.textContent = isRegister ? "Register" : "Login";
  authSubmit.textContent = isRegister ? "Register" : "Login";
  switchText.innerHTML = isRegister
    ? `Already have an account? <a href="#" id="switchLink">Login</a>`
    : `Don’t have an account? <a href="#" id="switchLink">Register</a>`;
  document.getElementById("switchLink").onclick = switchLink.onclick;
};

// Login/Register button click
authSubmit.onclick = () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) return alert("Please fill all fields!");

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (isRegister) {
    if (users[username]) return alert("Username already exists!");
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfully! You can now login.");
    isRegister = false;
    formTitle.textContent = "Login";
    authSubmit.textContent = "Login";
  } else {
    if (users[username] === password) {
      localStorage.setItem("loggedInUser", username);
      currentUser = username;
      showApp();
    } else {
      alert("Invalid username or password!");
    }
  }
};

// Logout
logoutBtn.onclick = () => {
  localStorage.removeItem("loggedInUser");
  currentUser = null;
  showAuth();
};

// Add Post
document.getElementById("addPost").onclick = () => {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();

  if (!title || !content) return alert("Please enter both title and content!");

  let posts = JSON.parse(localStorage.getItem("posts") || "[]");
  posts.push({
    title,
    content,
    author: currentUser,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";

  renderPosts();
};

// Render all posts
function renderPosts() {
  const posts = JSON.parse(localStorage.getItem("posts") || "[]").reverse();
  feed.innerHTML = posts
    .map(
      (p) => `
      <div class="post">
        <h3>${p.title}</h3>
        <p><em>by ${p.author} on ${p.date}</em></p>
        <p>${p.content.replace(/\n/g, "<br>")}</p>
      </div>`
    )
    .join("");
}

// Show main app (after login)
function showApp() {
  authSection.classList.add("hidden");
  postSection.classList.remove("hidden");
  feedSection.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  renderPosts();
}

// Show login/register form
function showAuth() {
  authSection.classList.remove("hidden");
  postSection.classList.add("hidden");
  feedSection.classList.add("hidden");
  logoutBtn.classList.add("hidden");
}

// Initial load
if (currentUser) showApp();
else showAuth();
