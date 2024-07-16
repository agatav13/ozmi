import { useEffect } from "react";
import { FormDataTypeWithId } from "types";

interface FetchDataProps {
  posts: FormDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<FormDataTypeWithId[]>>;
}

// przyjmuje wartości z useState w parent component
export default function FetchNews({ posts, setPosts }: FetchDataProps) {
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/news-posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // żeby nowe posty wyświetały się u góry
  const reversedPosts = [...posts].reverse();

  return (
    <div>
      <h2>Posty:</h2>
      {posts.length === 0 ? (
        <p>Brak postów</p>
      ) : (
        <div>
          {reversedPosts.map((post) => (
            <div>
              <h3>{post.title}</h3>
              <p><i>{post.category}</i></p>
              <p>{post.content}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}