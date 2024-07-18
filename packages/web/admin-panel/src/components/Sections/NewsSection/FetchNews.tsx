import { useEffect } from "react";
import { FormDataTypeWithId } from "types";

interface FetchDataProps {
  posts: FormDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<FormDataTypeWithId[]>>;
}

// przyjmuje wartości z useState w parent component
export default function FetchNews({ posts, setPosts }: FetchDataProps) {
  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/news-posts');
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

  return (
    <div>
      <h2>Posty:</h2>
      {posts.length === 0 ? (
        <p>Brak postów</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
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