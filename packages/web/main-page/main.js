const displayTiles = async () => {
  const response = await fetch('http://localhost:5000/news-posts');
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  // sortuje posty wg daty i wybiera trzy najnowsze
  const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  const newestPosts = sortedPosts.slice(0, 3);

  const datePosts = document.querySelectorAll('.date-post');
  const titlePosts = document.querySelectorAll('.title-post');

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("pl-Pl", {day: "2-digit", month: "2-digit", year: "numeric"})
  };

  newestPosts.forEach((post, index) => {
    if (index < datePosts.length) {
      datePosts[index].textContent = formattedDate(post.date);
      titlePosts[index].textContent = post.title;
    }
  });
};

window.onload = function () {
  displayTiles();
}