import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { PiPlusBold } from "react-icons/pi";
import FormCaseStudy from "./FormCaseStudy";
import { CaseStudyDataTypeWithId } from "types";
import FetchCaseStudy from "./FetchCaseStudy";

export default function CaseStudies() {
  const [showCaseStudyForm, setShowCaseStudyForm] = useState(false)
  const [posts, setPosts] = useState<CaseStudyDataTypeWithId[]>([]);
  const [refresh, setRefresh] = useState(false);

  // nowe posty wyświetlają się bez odświeżania
  const handlePostAdded = () => {
    setRefresh(prev => !prev);
  };

  return (
    <>
      <h2 className="SectionTitle">Case studies</h2>
      <button type="button" className="AddNewButton" onClick={() => setShowCaseStudyForm(true)}><PiPlusBold />Dodaj nowy post</button>
      {!showCaseStudyForm && (<></>)}

      {showCaseStudyForm && (
        <>
          <div className="FormTitle">
            <button type="button" className="DiscardButton" onClick={() => setShowCaseStudyForm(false)}><CgClose /></button>
            <p><b>Dodaj case study:</b></p>
          </div>
          <FormCaseStudy updateShowForm={setShowCaseStudyForm} onPostAdded={handlePostAdded} />
        </>
      )}
      <FetchCaseStudy posts={posts} setPosts={setPosts} refresh={refresh} />
    </>
  );
}
