import { FormDataTypeWithId } from "types";

interface DeleteNewsPostProps {
  post: FormDataTypeWithId,
  setDeletedPost: React.Dispatch<React.SetStateAction<FormDataTypeWithId | null>>,
  onPostDeleted: (id: number) => void
}

export default function DeleteNewsPost({ post, setDeletedPost, onPostDeleted }: DeleteNewsPostProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete-news-posts/${post.id}`, {
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
    <>
      <p>Czy na pewno chcesz usunąć ten post?</p>
      <button type="button" onClick={() => setDeletedPost(null)}>Anuluj</button>
      <button type="button" onClick={() => handleDelete()}>Usuń</button>
    </>
  );
}