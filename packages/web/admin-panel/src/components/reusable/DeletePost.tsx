import { CaseStudyDataTypeWithId, FormDataTypeWithId } from "types";

type deletedPostState<T> = React.Dispatch<React.SetStateAction<T | null>>;

interface DeleteNewsPostProps {
  deleteFrom: "news-posts" | "case-study-posts",
  post: FormDataTypeWithId | CaseStudyDataTypeWithId,
  setDeletedPost: deletedPostState<FormDataTypeWithId> | deletedPostState<CaseStudyDataTypeWithId>,
  onPostDeleted: (id: number) => void
}

export default function DeleteNewsPost({ deleteFrom, post, setDeletedPost, onPostDeleted }: DeleteNewsPostProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete-${deleteFrom}/${post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      setDeletedPost(null);
      onPostDeleted(post.id);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="DeletePostContainer">
      <h6>Czy na pewno chcesz usunąć ten post?</h6>
      <p>Czynność nie może być cofnięta.</p>
      <div>
        <button type="button" onClick={() => setDeletedPost(null)}>Anuluj</button>
        <button type="button" onClick={() => handleDelete()}>Tak, usuń</button>
      </div>
    </div>
  );
}