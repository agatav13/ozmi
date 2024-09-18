import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Components } from 'react-markdown';
import { FormDataTypeWithId } from "types";
import EditNewsPost from "./EditNewsPost";
import DeleteNewsPost from "../../reusable/DeletePost";

interface FetchNewsProps {
  posts: FormDataTypeWithId[];
  setPosts: React.Dispatch<React.SetStateAction<FormDataTypeWithId[]>>;
  refresh: boolean;
}

export default function FetchNews({ posts, setPosts, refresh }: FetchNewsProps) {
  const [editingPost, setEditingPost] = useState<FormDataTypeWithId | null>(null);
  const [deletedPost, setDeletedPost] = useState<FormDataTypeWithId | null>(null);
  const [refreshAfterEdit, setRefreshAfterEdit] = useState(false);

  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/get-news-posts");
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      console.error("Error fetching posts");
    }
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

  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Warsaw",
    });
  };

  // Custom components for react-markdown
  const components: Components & { 
    inlineMath: React.ComponentType<{ node: { value: string } }>,
    math: React.ComponentType<{ node: { value: string } }> 
  } = {
    inlineMath: ({ node }) => <InlineMath math={node.value} />,
    math: ({ node }) => <BlockMath math={node.value} />,
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
              <div className="PostContent">
                <ReactMarkdown 
                  components={components}
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
              <div className="PhotoGallery">
                {post.images &&
                  post.images.map((image, index) => (
                    <img loading="lazy" key={index} src={`http://localhost:5000/uploads/news-posts/${image}`} alt={`Zdjęcie ${index}`} />
                  ))}
              </div>

              <div className="ButtonContainer">
                <button type="button" onClick={() => setEditingPost(post)}>
                  Edytuj
                </button>
                <button type="button" onClick={() => setDeletedPost(post)}>
                  Usuń
                </button>
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
