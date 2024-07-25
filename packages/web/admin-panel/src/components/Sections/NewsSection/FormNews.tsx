import { useState } from "react";
import DateInput from "../../reusable/DateInput";
import DropFiles from "./DropFiles";
import { FormDataTypeWithId, FormDataType } from "types";

interface NewsFormProps {
  updateShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onPostAdded: (newPost: FormDataTypeWithId) => void;
}

export default function FormNews({ updateShowForm, onPostAdded }: NewsFormProps) {
  type HTMLElementEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>

  // tworzy początkową wersję postu
  const formData: FormDataType = {
    title: "",
    date: new Date(),
    category: "",
    content: ""
  };

  const [responseBody, setResponseBody] = useState<FormDataType>(formData);

  // aktualizuje zawartość pól w poście (zmienia reponseBody)
  const handleChange = (event: HTMLElementEvent) => {
    const {name, value} = event.target
    setResponseBody({...responseBody, [name]: value})
  };

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", responseBody);

    try {
      const response = await fetch("http://localhost:5000/news-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responseBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const result = await response.json();
      onPostAdded({ ...responseBody, id: result.id }); // żeby po dodaniu nowego postu wyświetlał się bez odświeżania
      setResponseBody(formData);  // ustawia wartości, które były w poście jako reponseBody
      updateShowForm(false);  // ukrywa element dodawania postu po dodaniu
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form className="NewsForm" onSubmit={handleSubmit}>
      <label htmlFor="title">Tytuł</label>
      <input type="text" name="title" id="title" required onChange={(e)=>handleChange(e)} value={responseBody.title} />

      <label htmlFor="date">Data</label>
      <DateInput name="date" id="date" onChange={(date) => setResponseBody({...responseBody, date})} />

      <label htmlFor="category">Kategoria</label>
      <select name="category" id="category" required onChange={(e)=>handleChange(e)} value={responseBody.category}>
        <option value="" disabled selected>Wybierz kategorię</option>
        <option value="szkola-modelowania-matematycznego">Szkoła Modelowania Matematycznego</option>
        <option value="wspolpraca">Współpraca</option>
        <option value="inne">Inne</option>
      </select>

      <label htmlFor="content">Treść</label>
      <textarea name="content" id="content" required rows={10} onChange={(e)=>handleChange(e)} value={responseBody.content}></textarea>

      <label htmlFor="photos">Zdjęcia</label>
      {/* <DropFiles /> */}

      <input className="AddNewButton" type="submit" value="Dodaj" />
    </form>
  );
}