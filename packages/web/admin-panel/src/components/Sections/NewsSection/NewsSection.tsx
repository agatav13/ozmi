import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import FetchData from "../../FetchData";
import { useState } from "react";
import NewsForm from "./NewsForm";

export default function NewsSection() {
  const [showForm, setShowForm] = useState(false);

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
          <NewsForm updateShowForm={setShowForm} />
        </>
      )}
      <p>Tu się posty wyświetlać będą:</p>
      <FetchData />
    </>
  );
}