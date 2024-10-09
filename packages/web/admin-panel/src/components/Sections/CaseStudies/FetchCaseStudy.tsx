import { useEffect, useState } from "react";
import { CaseStudyDataTypeWithId, CaseStudyPostsContentType } from "types";
import DeletePost from "../../reusable/DeletePost";

interface FetchDataProps {
  posts: CaseStudyDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<CaseStudyDataTypeWithId[]>>;
  refresh: boolean;
}

export default function FetchNews({ posts, setPosts, refresh }: FetchDataProps) {
  const [editingPost, setEditingPost] = useState<CaseStudyDataTypeWithId | null>(null);
  const [deletedPost, setDeletedPost] = useState<CaseStudyDataTypeWithId | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [refreshAfterEdit, setRefreshAfterEdit] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/get-case-study-posts");
    if (response.ok) {
      const data = await response.json();

      // grupuje contents do odpowiednij postów po post_id
      const groupedPosts = data.reduce((acc: any, curr: any) => {
        const postId = curr.post_id;

        let post = acc.find((p: any) => p.id === postId);
        if (!post) {
          post = {
            id: postId,
            title: curr.title,
            date: curr.date,
            category: curr.category,
            content: [],
          };
          acc.push(post);
        }

        post.content.push({
          post_id: curr.post_id,
          position_number: curr.position_number,
          content_type: curr.content_type,
          content: curr.content,
        });

        return acc;
      }, []);

      setPosts(groupedPosts);
    } else {
      console.error("Error");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh, refreshAfterEdit]);

  // dodac po utworzeniu EditCaseStudy.tsx do onPostUpdated
  const handlePostUpdated = () => {
    setRefreshAfterEdit((prev) => !prev);
  };

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

  const renderContent = (content: CaseStudyPostsContentType[]) => {
    if (!content) return null;

    return content.map((item, index) => (
      <div key={index}>
        {item.content_type === "text" && <p>{item.content}</p>}
        {item.content_type === "photo" && (
          <img
            loading="lazy"
            src={`http://localhost:5000/uploads/case-study-posts/${item.content}`}
            alt={`Element ${index}`}
            width={"100%"}
          />
        )}
      </div>
    ));
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

              {post.content && renderContent(post.content)}

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
