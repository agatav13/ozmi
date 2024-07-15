import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import FetchData from "../../FetchData";
import { useState } from "react";
import DateInput from "../../reusable/DateInput";
import { Upload } from "antd/lib";

export default function NewsSection() {
  const [showForm, setShowForm] = useState(false);

  const { Dragger } = Upload;

  return (
    <>
    	<h2 className="SectionTitle">Aktualności</h2>
      <button type="button" className="AddNewButton" onClick={() => setShowForm(true)}><PiPlusBold />Dodaj nowy post</button>
      {!showForm && (<></>)}

      {showForm && (
        <>
          <div className="FormTitle">
          	<button type="button" className="DiscardButton" onClick={() => setShowForm(false)}><CgClose /></button>
              <p><b>Dodaj nową aktualność:</b></p>
          </div>
          <form className="NewsForm" action="">
            <label htmlFor="title">Tytuł</label>
            <input type="text" name="title" id="title" />

            <label htmlFor="date">Data</label>
            <DateInput />

            <label htmlFor="category">Kategoria</label>
          	<select name="category" id="category">
              <option value="szkola-modelowania-matematycznego">Szkoła Modelowania Matematycznego</option>
              <option value="wspolpraca">Współpraca</option>
              <option value="inne"><p>Inne</p></option>
            </select>

            <label htmlFor="content">Treść</label>
            <textarea name="content" id="content" rows={10}></textarea>

            <label htmlFor="photos">Zdjęcia</label>
            <Dragger name="photos" id="photos">
              <p>Przeciągnij lub wybierz zdjęcia</p>
            </Dragger>

            <input type="submit" value="Dodaj" />
          </form>
        </>
      )}
      <p>Tu się posty wyświetlać będą:</p>
      <FetchData />
    </>
  );
}