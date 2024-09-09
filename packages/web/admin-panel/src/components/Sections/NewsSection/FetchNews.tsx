import { useEffect, useState } from "react";
import { FormDataTypeWithId } from "types";
import EditNewsPost from "./EditNewsPost";
import DeleteNewsPost from "../../reusable/DeletePost";

interface FetchDataProps {
  posts: FormDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<FormDataTypeWithId[]>>;
  refresh: boolean;
}

// przyjmuje wartości z useState w parent component
export default function FetchNews({ posts, setPosts, refresh }: FetchDataProps) {
  const [editingPost, setEditingPost] = useState<FormDataTypeWithId | null>(null);
  const [deletedPost, setDeletedPost] = useState<FormDataTypeWithId | null>(null);
  const [refreshAfterEdit, setRefreshAfterEdit] = useState(false);

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
  }, [refresh, refreshAfterEdit]);

  const handlePostUpdated = () => {
    setRefreshAfterEdit(prev => !prev);
  };

  const deletePostFromState = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Warsaw"
    });
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
              <div className="PhotoGallery">
                {post.images && post.images.map((image, index) => (
                  <img loading="lazy" key={index} src={`http://localhost:5000/uploads/news-posts/${image}`} alt={`Zdjęcie ${index}`} />
                ))}
              </div>
              <div className="ButtonContainer">
                <button type="button" onClick={() => setEditingPost(post)}>Edytuj</button>
                <button type="button" onClick={() => setDeletedPost(post)}>Usuń</button>
              </div>
              {deletedPost && deletedPost.id === post.id && (
                <DeleteNewsPost deleteFrom="news-posts" post={post} setDeletedPost={setDeletedPost} onPostDeleted={deletePostFromState} />
              )}
              {editingPost && editingPost.id === post.id && (
                <EditNewsPost post={post} setEditingPost={setEditingPost} onPostUpdated={handlePostUpdated} />
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}