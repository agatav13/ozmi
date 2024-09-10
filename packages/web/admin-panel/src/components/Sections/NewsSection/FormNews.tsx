import { useState } from "react";
import DateInput from "../../reusable/DateInput";
import DropFiles from "./DropFiles";
import { FormDataType, FileWithPreview } from "types";

interface NewsFormProps {
  updateShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onPostAdded: () => void;
}

export default function FormNews({ updateShowForm, onPostAdded }: NewsFormProps) {
  // tworzy początkową wersję postu
  const formData: FormDataType = {
    title: "",
    date: new Date(),
    category: "",
    content: ""
  };

  const [responseBody, setResponseBody] = useState<FormDataType>(formData);
  const [images, setImages] = useState<FileWithPreview[]>([]);

  // aktualizuje zawartość pól w poście (zmienia reponseBody)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target
    setResponseBody({...responseBody, [name]: value})
  };

  // dodaje nowe zdjęcia do array
  const handleFilesAdded = (files: FileWithPreview[]) => {
    setImages([...images, ...files]);
  };

  const handleFileRemoved = (fileToRemove: FileWithPreview) => {
    setImages(newImages => newImages.filter(file => file !== fileToRemove));
  };

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", responseBody);

    const formDataToPost = new FormData();
    formDataToPost.append("title", responseBody.title);
    formDataToPost.append("date", responseBody.date.toISOString());
    formDataToPost.append("category", responseBody.category);
    formDataToPost.append("content", responseBody.content);
    images.forEach((image) => {
      formDataToPost.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:5000/create-news-posts", {
        method: "POST",
        body: formDataToPost
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      onPostAdded(); // żeby po dodaniu nowego postu wyświetlał się bez odświeżania
      setResponseBody(formData);  // ustawia wartości, które były w poście jako reponseBody
      updateShowForm(false);  // ukrywa element dodawania postu po dodaniu
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label htmlFor="title">Tytuł</label>
      <input type="text" name="title" id="title" required onChange={(e)=>handleChange(e)} value={responseBody.title} />

      <label htmlFor="date">Data</label>
      <DateInput name="date" id="date" onChange={(date) => setResponseBody({...responseBody, date})} />

      <label htmlFor="category">Kategoria</label>
      <select name="category" id="category" required onChange={(e)=>handleChange(e)} value={responseBody.category}>
        <option value="" disabled selected>Wybierz kategorię</option>
        <option value="Szkoła Modelowania Matematycznego">Szkoła Modelowania Matematycznego</option>
        <option value="Współpraca">Współpraca</option>
        <option value="Inne">Inne</option>
      </select>

      <label htmlFor="content">Treść</label>
      <textarea name="content" id="content" required rows={10} onChange={(e)=>handleChange(e)} value={responseBody.content}></textarea>

      <label htmlFor="photos">Zdjęcia</label>
      <DropFiles
        name="photos"
        id="photos" 
        onFilesAdded={handleFilesAdded}
        onFileRemoved={handleFileRemoved}
        newImages={images}
      />

      <input className="AddNewButton" type="submit" value="Dodaj" />
    </form>
  );
}