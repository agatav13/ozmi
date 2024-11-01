import Footer from "../Footer";

export default function NewsPage() {
  // js:

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
  
  // async function fetchNewsPosts() {
  //   const response = await fetch("http://localhost:5000/get-news-posts");
  //   if (!response.ok) {
  //     throw new Error(
  //       `Error fetching posts: ${response.status}, ${response.statusText}`
  //     );
  //   }
  //   const data = await response.json();
  
  //   const newsPostsContainer = document.getElementById("news-posts-container");
  
  //   newsPostsContainer.innerHTML = data
  //     .map(
  //       (post) => `
  //     <div class="news-post">
  //       <h3 class="title">${post.title}</h3>
  //       <p>${formattedDate(post.date)}</p>
  //       <p><i>${post.category}</i></p>
  //       <div class="content">${formattedContent(post.content)}</div>
  //       <hr />
  //     </div>
  //   `
  //     )
  //     .join("");
  
  //   MathJax.typesetPromise();
  // }
  
  // window.onload = function () {
  //   fetchNewsPosts();
  // };
  
  return (
    <>
      <header className="NewsPage">
        <img src="ozmi-logo.webp" alt="Logo Ośrodka Zastosowań Matematyki i Informatyki" />
        <div>
          <h1>Aktualności</h1>
          <h2>Ośrodek Zastosowań Matematyki i Informatyki</h2>
        </div>
      </header>

      <main>
        <a className="MainPageLink TextShadowLink" href="/"><span style={{fontSize: "26px"}}>&#8592;</span><p>Powrót do głównej strony</p></a>
        <div id="news-posts-container">
          {/* Aktualności wyświetlane za pomocą funkcji */}
        </div>
      </main>

      <Footer />
    </>
  );
}