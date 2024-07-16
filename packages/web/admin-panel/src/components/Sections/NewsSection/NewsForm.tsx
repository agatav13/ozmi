import { Dispatch, SetStateAction, useState } from "react";
import DateInput from "../../reusable/DateInput";
import DropFiles from "./DropFiles";
import { FormDataType } from "types";

export default function NewsForm({ updateShowForm }: { updateShowForm: Dispatch<SetStateAction<boolean>> }) {
  type HTMLElementEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>

  const formData: FormDataType = {
    title: "",
    category: "",
    content: ""
  };

  const [responseBody, setResponseBody] = useState<FormDataType>(formData);

  const inputChangeHandler = (event: HTMLElementEvent) => {
    const {name, value} = event.target
    setResponseBody({...responseBody, [name]: value})
  };

  const onSubmitHandler =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(responseBody)

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
      console.log("Response:", result);
      setResponseBody(formData);
      updateShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form className="NewsForm" onSubmit={onSubmitHandler}>  {/* action="/news-posts" method="post" */}
      <label htmlFor="title">Tytuł</label>
      <input type="text" name="title" id="title" onChange={(e)=>inputChangeHandler(e)} value={responseBody.title} />

      <label htmlFor="date">Data</label>
      {/* <DateInput /> */}

      <label htmlFor="category">Kategoria</label>
      <select name="category" id="category" onChange={(e)=>inputChangeHandler(e)} value={responseBody.category}>
        <option value="" disabled selected>Wybierz kategorię</option>
        <option value="szkola-modelowania-matematycznego">Szkoła Modelowania Matematycznego</option>
        <option value="wspolpraca">Współpraca</option>
        <option value="inne"><p>Inne</p></option>
      </select>

      <label htmlFor="content">Treść</label>
      <textarea name="content" id="content" rows={10} onChange={(e)=>inputChangeHandler(e)} value={responseBody.content}></textarea>

      <label htmlFor="photos">Zdjęcia</label>
      {/* <DropFiles /> */}

      <input className="AddNewButton" type="submit" value="Dodaj" />
      {/* <button className="AddNewButton" type="submit">Dodaj</button> */}
    </form>
  );
}