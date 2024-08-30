async function fetchNewestNewsPosts() {
  const response = await fetch('http://localhost:5000/get-news-posts');
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data.slice(0, 3);
}

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
}

async function displayNewsTiles() {
  newestPosts = await fetchNewestNewsPosts();

  const newsTilesContainer = document.getElementById("transform-news-tiles");

  newsTilesContainer.innerHTML = newestPosts.map((post, index) => `
    <div class="tile">
      <p class="date-post">${formattedDate(post.date)}</p>
      <img src="/packages/web/main-page/images/testowe3.jpg" alt="Zdjęcie postu" class="photo-post">
      <h3 class="title-post">${post.title}</h3>
      <button type="button" onclick="expandTile(${index})" class="see-more text-align-right text-shadow-link">Zobacz więcej...</button>
    </div>
  `).join("");
};

async function expandTile(index) {
  newestPosts = await fetchNewestNewsPosts();

  const post = newestPosts[index];
  const newsTilesContainer = document.getElementById("transform-news-tiles");

  newsTilesContainer.innerHTML = `
   <div class="expanded-tile">
      <p class="date-post">${formattedDate(post.date)}</p>
      <img src="/packages/web/main-page/images/testowe2.jpg" alt="Zdjęcie postu" class="photo-post">
      <h3 class="title-post">${post.title}</h3>
      <p class="category-post"><i>${post.category}</i></p>
      <p class="content-post">${formattedContent(post.content)}</p>
      <button type="button" onclick="displayNewsTiles()" class="see-more text-align-right text-shadow-link">Pokaż mniej</button>
    </div>
  `;
};

window.onload = function () {
  displayNewsTiles();
}