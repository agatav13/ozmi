const displayTiles = async () => {
  const response = await fetch('http://localhost:5000/get-news-posts');
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  // sortuje posty wg daty i wybiera trzy najnowsze
  const newestPosts = data.slice(0, 3);

  const datePosts = document.querySelectorAll('.date-post');
  const titlePosts = document.querySelectorAll('.title-post');

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Warsaw"
    });
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