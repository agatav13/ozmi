export default function NewsSection() {
  // js do wyświetlania postów

  // function formattedDate(date) {
  //   return new Date(date).toLocaleDateString("pl-PL", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //     timeZone: "Europe/Warsaw",
  //   });
  // }
  
  // // formatuje treść postu uwzględniając markdown i latex
  // function formattedContent(content) {
  //   const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g);
  
  //   return parts
  //     .map((part) => {
  //       if (part.startsWith("$") && part.endsWith("$")) {
  //         return `<span class="math">${part}</span>`;
  //       } else {
  //         return marked(part);
  //       }
  //     })
  //     .join("");
  // }
  
  // // zwraca trzy najnowsze posty, który wyświetlane są w kafelkach
  // async function fetchNewestNewsPosts() {
  //   const response = await fetch("http://localhost:5000/get-news-posts");
  //   if (!response.ok) {
  //     throw new Error(
  //       `Error fetching posts: ${response.status}, ${response.statusText}`
  //     );
  //   }
  //   const data = await response.json();
  
  //   return data.slice(0, 3);
  // }
  
  // async function displayNewsTiles() {
  //   newestPosts = await fetchNewestNewsPosts();
  
  //   const newsTilesContainer = document.getElementById("transform-news-tiles");
  
  //   // wyświetla pierwsze zdjęcie w poście, jeżeli nie ma żadnych to inne defaultowe zdjęcie jest podlinkowane
  //   newsTilesContainer.innerHTML = newestPosts
  //     .map(
  //       (post, index) => `
  //     <div class="tile">
  //       <p class="date-post">${formattedDate(post.date)}</p>
  //       <img src="${
  //         post.images.length > 0
  //           ? `http://localhost:5000/uploads/news-posts/${post.images[0]}`
  //           : "images/uz-1.png"
  //       }" alt="Zdjęcie postu" class="photo-post">
  //       <h3 class="title-post">${post.title}</h3>
  //       <button type="button" onclick="expandTile(${index})" class="see-more text-align-right text-shadow-link">Zobacz więcej...</button>
  //     </div>
  //   `
  //     )
  //     .join("");
  // }
  
  // async function expandTile(index) {
  //   newestPosts = await fetchNewestNewsPosts();
  
  //   const post = newestPosts[index];
  //   const newsTilesContainer = document.getElementById("transform-news-tiles");
  
  //   const hasImage = post.images && post.images.length > 0;
  
  //   newsTilesContainer.innerHTML = `
  //    <div class="expanded-tile">
  //       <p class="date-post">${formattedDate(post.date)}</p>
  //       ${
  //         hasImage
  //           ? `<img src="http://localhost:5000/uploads/news-posts/${post.images[0]}" alt="Zdjęcie postu" class="photo-post">`
  //           : ""
  //       }
  //       <h3 class="title-post">${post.title}</h3>
  //       <p class="category-post"><i>${post.category}</i></p>
  //       <p class="content-post">${formattedContent(post.content)}</p>
  //       <button type="button" onclick="displayNewsTiles()" class="see-more text-align-right text-shadow-link">Pokaż mniej</button>
  //     </div>
  //   `;
  
  //   MathJax.typesetPromise();
  // }
  
  // window.onload = function () {
  //   displayNewsTiles();
  // };
  
  return (
    <div className="NewsSection" id="news-section">
    	<h2 className="TextAlignCenter SectionTitle">Aktualności</h2>
      <div id="transform-news-tiles" className="NewsTiles">
        {/* 'Kafelki' z aktualnościami wyświetlane za pomocą funkcji displayNewsTiles() */}
      </div>
      <p className="TextAlignRight TextShadowLink"><a href="newsSection/newsSection.html"><b>Przeczytaj więcej</b></a></p>
    </div>
  );
}
