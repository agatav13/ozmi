import { useEffect } from "react";
import { CaseStudyDataTypeWithId } from "types";

interface FetchDataProps {
  posts: CaseStudyDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<CaseStudyDataTypeWithId[]>>;
}

// przyjmuje wartości z useState w parent component
export default function FetchNews({ posts, setPosts }: FetchDataProps) {
  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/get-case-studies');
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      console.error('Error');
      }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-Pl", {day: "2-digit", month: "2-digit", year: "numeric"})
  };

  // const formattedContent = (content: string) => {
  //   return (content.split("\n").map((line, index) => (
  //     <span key={index}>
  //       {line}
  //       <br />
  //     </span>
  //   )));
  // };

  return (
    <div>
      {posts.length === 0 ? (
        <p className="NoNews">Brak postów</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="PostNews">
              <h3 className="PostTitle">{post.title}</h3>
              <p className="PostDate">{formattedDate(post.date)}</p>
              <p className="PostCategory">{post.category}</p>
              {/* <p className="PostContent">{formattedContent(post.content)}</p> */}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}