import { useEffect, useState } from "react";
import { FormDataTypeWithId } from "types";
import EditNewsPost from "./EditNewsPost";
import DeletePost from "../../reusable/DeletePost";
import FormattedNews from "./FormattedNews";

interface FetchNewsProps {
  posts: FormDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<FormDataTypeWithId[]>>;
  refresh: boolean;
}

export default function FetchNews({ posts, setPosts, refresh }: FetchNewsProps) {
  const [editingPost, setEditingPost] = useState<FormDataTypeWithId | null>(null);
  const [deletedPost, setDeletedPost] = useState<FormDataTypeWithId | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [refreshAfterEdit, setRefreshAfterEdit] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/get-news-posts");
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error fetching posts:", errorText);
      return;
    }
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh, refreshAfterEdit]);

  const handlePostUpdated = () => {
    setRefreshAfterEdit((prev) => !prev);
  };

  const deletePostFromState = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p className="NoNews">Brak postów</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="PostNews">
              <FormattedNews post={post} />

              <div className="ButtonContainer">
                <button type="button" onClick={() => setEditingPost(post)}>
                  Edytuj
                </button>
                <button type="button" onClick={() => {
                  setDeletedPost(post);
                  setOpenModal(true);
                }}>
                  Usuń
                </button>
              </div>

              {deletedPost && deletedPost.id === post.id && (
                <DeletePost
                  deleteFrom="news-posts"
                  post={post}
                  setDeletedPost={setDeletedPost}
                  onPostDeleted={deletePostFromState}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              )}

              {editingPost && editingPost.id === post.id && (
                <EditNewsPost
                  post={post}
                  setEditingPost={setEditingPost}
                  onPostUpdated={handlePostUpdated}
                />
              )}
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
