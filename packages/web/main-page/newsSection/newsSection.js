function formattedDate(date) {
  return new Date(date).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Warsaw"
  });
};

function formattedContent(content) {
  return content.split("\n").map(line => 
    `<span>${line}<br></span>`
  ).join("");
};

async function fetchNewsPosts() {
  const response = await fetch("http://localhost:5000/get-news-posts");
  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.status}, ${response.statusText}`);
  }
  const data = await response.json();

  const newsPostsContainer = document.getElementById("news-posts-container");

  newsPostsContainer.innerHTML = data.map((post) => `
    <div class="news-post">
      <h3 class="title">${post.title}</h3>
      <p>${formattedDate(post.date)}</p>
      <p><i>${post.category}</i></p>
      <p class="content">${formattedContent(post.content)}</p>
      <hr />
    </div>
  `).join("");
};

window.onload = function() {
  fetchNewsPosts();
}