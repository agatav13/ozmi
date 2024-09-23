import { FormDataTypeWithId } from "types";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Components } from "react-markdown";

export default function FormattedNews({ post }: { post: FormDataTypeWithId }) {
  const formattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Europe/Warsaw",
    });
  };

  const components: Components & {
    inlineMath: React.ComponentType<{ node: { value: string } }>;
    math: React.ComponentType<{ node: { value: string } }>;
  } = {
    inlineMath: ({ node }) => <InlineMath math={node.value} />,
    math: ({ node }) => <BlockMath math={node.value} />,
  };

  return (
    <>
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
            <img
              loading="lazy"
              key={index}
              src={`http://localhost:5000/uploads/news-posts/${image}`}
              alt={`Zdjęcie ${index}`}
            />
          ))}
      </div>
    </>
  );
}
