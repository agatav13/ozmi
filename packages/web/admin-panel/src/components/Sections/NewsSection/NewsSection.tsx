import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import FetchNews from "./FetchNews";
import { useState } from "react";
import FormNews from "./FormNews";
import { FormDataTypeWithId } from "types";

export default function NewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState<FormDataTypeWithId[]>([]);

  // nowe posty wyświetlają się bez odświeżania
  const handlePostAdded = (newPost: FormDataTypeWithId) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

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
          <FormNews updateShowForm={setShowForm} onPostAdded={handlePostAdded} />
        </>
      )}
      <FetchNews posts={posts} setPosts={setPosts} />
    </>
  );
}