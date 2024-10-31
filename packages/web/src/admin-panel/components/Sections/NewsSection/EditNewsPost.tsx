import { useState } from "react";
import DateInput from "../../reusable/DateInput";
import { FileWithPreview, FormDataTypeWithId } from "types";
import { CgClose } from "react-icons/cg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DropFiles from "./DropFiles";
import SelectInput from "../../reusable/SelectInput";

interface EditNewsPostProps {
  post: FormDataTypeWithId;
  setEditingPost: React.Dispatch<React.SetStateAction<FormDataTypeWithId | null>>;
  onPostUpdated: () => void;
}

export default function EditNewsPost({ post, setEditingPost, onPostUpdated }: EditNewsPostProps) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [responseBody, setResponseBody] = useState<FormDataTypeWithId>({
    ...post,
    date: dayjs(post.date).tz("Europe/Warsaw").toDate(),
  });
  const [existingImages, setExistingImages] = useState<string[]>(post.images || []);
  const [newImages, setNewImages] = useState<FileWithPreview[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setResponseBody({...responseBody, [name]: value})
  };

  const handleFilesAdded = (files: FileWithPreview[]) => {
    setNewImages([...newImages, ...files]);
  };

  const handleFileRemoved = (fileToRemove: FileWithPreview) => {
    setNewImages((newImages) =>
      newImages.filter((file) => file !== fileToRemove)
    );
  };

  const handleRemoveExistingImage = (imageToRemove: string) => {
    setExistingImages(existingImages.filter((img) => img !== imageToRemove));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", responseBody);

    const formDataToPost = new FormData();
    formDataToPost.append("id", responseBody.id.toString());
    formDataToPost.append("title", responseBody.title);

    const formattedDate = new Date(responseBody.date).toISOString().split('T')[0];  // YYYY-MM-DD
    formDataToPost.append("date", formattedDate)

    formDataToPost.append("category", responseBody.category);
    formDataToPost.append("content", responseBody.content);
    formDataToPost.append("existingImages", JSON.stringify(existingImages));
    newImages.forEach((image) => {
      formDataToPost.append("newImages", image);
    });

    try {
      const response = await fetch("http://localhost:5000/edit-news-posts", {
        method: "POST",
        body: formDataToPost,
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update result:", result);
      onPostUpdated(); // żeby po zaktualizowaniu postu wyświetlał się bez odświeżania
      setEditingPost(null); // zamyka element po zapisaniu
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button className="DiscardChanges" type="button" onClick={() => setEditingPost(null)}>
        <CgClose /> Anuluj zmiany
      </button>
      <form className="Form Edit" onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł</label>
        <input type="text" name="title" id="title" required onChange={(e)=>handleChange(e)} value={responseBody.title} />

        <label htmlFor="date">Data</label>
        <DateInput
          name="date"
          id="date"
          onChange={(date) => setResponseBody({ ...responseBody, date })}
          value={responseBody.date}
        />

        <label htmlFor="category">Kategoria</label>
        <SelectInput
          name="category"
          id="category"
          options={["Szkoła Modelowania Matematycznego", "Współpraca", "Inne"]}
          onChange={handleChange}
          value={responseBody.category}
        />

        <label htmlFor="content">Treść</label>
        <textarea name="content" id="content" required rows={10} onChange={handleChange} value={responseBody.content}></textarea>

        <label htmlFor="photos">Zdjęcia</label>
        <DropFiles
          name="photos"
          id="photos"
          onFilesAdded={handleFilesAdded}
          onFileRemoved={handleFileRemoved}
          newImages={newImages}
          existingImages={existingImages}
          handleRemoveExistingImage={handleRemoveExistingImage}
        />

        <input className="AddNewButton" type="submit" value="Zapisz" />
      </form>
    </>
  );
}
