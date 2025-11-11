// Handle blog storage and rendering
const postBtn = document.getElementById("postBtn");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const blogsContainer = document.getElementById("blogsContainer");

document.addEventListener("DOMContentLoaded", showBlogs);

postBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Please enter both title and content.");
    return;
  }

  const blog = {
    title,
    content,
    date: new Date().toLocaleString(),
  };

  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.unshift(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));

  titleInput.value = "";
  contentInput.value = "";

  showBlogs();
});

function showBlogs() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogsContainer.innerHTML = "";

  if (blogs.length === 0) {
    blogsContainer.innerHTML = "<p>No blogs yet. Start writing!</p>";
    return;
  }

  blogs.forEach((blog) => {
    const div = document.createElement("div");
    div.classList.add("blog-card");
    div.innerHTML = `
      <h3>${blog.title}</h3>
      <small>Posted on: ${blog.date}</small>
      <p>${blog.content}</p>
    `;
    blogsContainer.appendChild(div);
  });
}
