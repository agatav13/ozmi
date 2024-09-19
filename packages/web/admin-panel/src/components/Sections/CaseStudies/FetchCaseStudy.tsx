import { useEffect, useState } from "react";
import { CaseStudyDataTypeWithId } from "types";
import DeletePost from "../../reusable/DeletePost";

interface FetchDataProps {
  posts: CaseStudyDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<CaseStudyDataTypeWithId[]>>;
}

export default function FetchNews({ posts, setPosts }: FetchDataProps) {
  const [editingPost, setEditingPost] = useState<CaseStudyDataTypeWithId | null>(null);
  const [deletedPost, setDeletedPost] = useState<CaseStudyDataTypeWithId | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/get-case-study-posts");
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePostFromState = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-Pl", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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
              <div className="ButtonContainer">
                {/* <button type="button" onClick={() => setEditingPost(post)}>Edytuj</button> */}
                <button type="button" onClick={() => {
                  setDeletedPost(post);
                  setOpenModal(true);
                }}>
                  Usuń
                </button>
              </div>
              {deletedPost && deletedPost.id === post.id && (
                <DeletePost
                  deleteFrom="case-study-posts"
                  post={post}
                  setDeletedPost={setDeletedPost}
                  onPostDeleted={deletePostFromState}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
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
