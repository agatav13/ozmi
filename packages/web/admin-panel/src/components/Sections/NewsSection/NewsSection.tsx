import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import FetchNews from "./FetchNews";
import { useState } from "react";
import FormNews from "./FormNews";
import { FormDataTypeWithId } from "types";

export default function NewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState<FormDataTypeWithId[]>([]);
  const [refresh, setRefresh] = useState(false);

  // nowe posty wyświetlają się bez odświeżania
  const handlePostAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <section>
      <h2 className="SectionTitle">Aktualności</h2>
      <button type="button" className="AddNewButton" onClick={() => setShowForm(true)} aria-label="Dodaj nowy post">
        <PiPlusBold />
        Dodaj nowy post
      </button>
      
      {showForm && (
        <>
          <div className="FormTitle">
          	<button type="button" className="DiscardButton" onClick={() => setShowForm(false)} aria-label="Anuluj dodawanie posta">
              <CgClose />
            </button>
            <p><b>Dodaj aktualność:</b></p>
          </div>
          <FormNews updateShowForm={setShowForm} onPostAdded={handlePostAdded} />
        </>
      )}

      <FetchNews posts={posts} setPosts={setPosts} refresh={refresh} />
    </section>
  );
}
