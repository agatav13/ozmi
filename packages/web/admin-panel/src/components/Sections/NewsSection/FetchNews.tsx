import { useEffect, useState } from "react";
import { FormDataTypeWithId } from "types";
import EditNewsPost from "./EditNewsPost";

interface FetchDataProps {
  posts: FormDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<FormDataTypeWithId[]>>;
}

// przyjmuje wartości z useState w parent component
export default function FetchNews({ posts, setPosts }: FetchDataProps) {
  const [editingPost, setEditingPost] = useState<FormDataTypeWithId | null>(null);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/get-news-posts');
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

  const updatePostInState = (updatedPost: FormDataTypeWithId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-Pl", {day: "2-digit", month: "2-digit", year: "numeric"})
  };

  const formattedContent = (content: string) => {
    return (content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    )));
  };

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
              <p className="PostContent">{formattedContent(post.content)}</p>
              <div className="ButtonContainer">
                <button type="button" onClick={() => setEditingPost(post)}>Edytuj</button>
                <button type="button">Usuń</button>
              </div>
              {editingPost && editingPost.id === post.id && (
                (<EditNewsPost post={post} setEditingPost={setEditingPost} onPostUpdated={updatePostInState} />)
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}