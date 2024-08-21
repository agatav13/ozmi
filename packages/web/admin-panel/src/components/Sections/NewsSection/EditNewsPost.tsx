import { useState } from "react";
import DateInput from "../../reusable/DateInput";
import { FormDataTypeWithId } from "types";
import { CgClose } from "react-icons/cg";

interface EditNewsPostProps {
  post: FormDataTypeWithId;
  setEditingPost: React.Dispatch<React.SetStateAction<FormDataTypeWithId | null>>;
  onPostUpdated: (updatedPost: FormDataTypeWithId) => void;
}

export default function EditNewsPost({ post, setEditingPost, onPostUpdated }: EditNewsPostProps) {
  type HTMLElementEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>

  const formData: FormDataTypeWithId = {
    title: post.title,
    date: post.date,
    category: post.category,
    content: post.content,
    id: post.id
  };

  const [responseBody, setResponseBody] = useState<FormDataTypeWithId>(formData);

  const handleChange = (event: HTMLElementEvent) => {
    const {name, value} = event.target
    setResponseBody({...responseBody, [name]: value})
  };

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", responseBody);

    try {
      const response = await fetch("http://localhost:5000/edit-news-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update result:", result);
      onPostUpdated({ ...responseBody, id: post.id }); // żeby po zaktualizowaniu postu wyświetlał się bez odświeżania
      setResponseBody(formData);  // ustawia wartości, które były w poście jako reponseBody
      setEditingPost(null); // zamyka element po zapisaniu
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <button className="DiscardChanges" type="button" onClick={() => setEditingPost(null)}><CgClose /> Anuluj zmiany</button>
      <form className="Form Edit" onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł</label>
        <input type="text" name="title" id="title" required onChange={(e)=>handleChange(e)} value={responseBody.title} />

        <label htmlFor="date">Data</label>
        <DateInput name="date" id="date" onChange={(date) => setResponseBody({...responseBody, date})} value={responseBody.date} />

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
        {/* <DropFiles name="photos" id="photos" /> */}

        <input className="AddNewButton" type="submit" value="Zapisz" />
      </form>
    </>
  );
}