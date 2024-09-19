import { Modal } from "antd";
import { CaseStudyDataTypeWithId, FormDataTypeWithId } from "types";

type deletedPostState<T> = React.Dispatch<React.SetStateAction<T | null>>;

interface DeletePostProps {
  deleteFrom: "news-posts" | "case-study-posts";
  post: FormDataTypeWithId | CaseStudyDataTypeWithId;
  setDeletedPost: deletedPostState<FormDataTypeWithId> | deletedPostState<CaseStudyDataTypeWithId>;
  onPostDeleted: (id: number) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeletePost({ deleteFrom, post, setDeletedPost, onPostDeleted, openModal, setOpenModal }: DeletePostProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/delete-${deleteFrom}/${post.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      setDeletedPost(null);
      onPostDeleted(post.id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Modal 
      centered 
      open={openModal}
      cancelText="Anuluj"
      onCancel={() => {
        setDeletedPost(null);
        setOpenModal(false)}
      }
      okText="Usuń"
      onOk={() => handleDelete()}
    >
      <p>Czy na pewno chcesz usunąć ten post?</p>
      <p>Czynność nie może być cofnięta.</p>
    </Modal>
  );
}
