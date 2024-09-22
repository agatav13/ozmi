import { useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoTextOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

export default function InputsCaseStudies() {
  const [formElements, setFormElements] = useState<any[]>([]);

  const addTextArea = () => {
    setFormElements([...formElements, { type: "text", content: "" }]);
  };

  const addFileInput = () => {
    setFormElements([...formElements, { type: "file", content: "" }]);
  };

  const handleTextChange = (index: number, value: string) => {
    const newElements = [...formElements];
    newElements[index].content = value;
    setFormElements(newElements);
  };

  const handleFileChange = (index: number, files: any) => {
    const newElements = [...formElements];
    newElements[index].content = files[0];
    setFormElements(newElements);
  };

  const deleteElement = (index: number) => {
    const newElements = formElements.filter((_, i) => i !== index);
    setFormElements(newElements);
  };

  return (
    <>
      {formElements.map((element, index) => (
        <div className="CaseStudyInputs" key={index}>
          {element.type === "text" ? (
            <>
              <div className="LabelCaseStudy">
                <label htmlFor="content">Treść</label>
                <button type="button" onClick={() => deleteElement(index)}>
                  <FaTrash />
                </button>
              </div>
              <textarea
                name="content"
                id="content"
                required
                rows={8}
                onChange={(e) => handleTextChange(index, e.target.value)}
              />
            </>
          ) : (
            <>
              <div className="LabelCaseStudy">
                <label htmlFor="photos">Zdjęcia</label>
                <button type="button" onClick={() => deleteElement(index)}>
                  <FaTrash />
                </button>
              </div>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files)}
              />
            </>
          )}
        </div>
      ))}

      <div className="CaseStudiesButtons">
        <button type="button" onClick={addTextArea}>
          <IoTextOutline />
          Dodaj tekst
        </button>
        <button type="button" onClick={addFileInput}>
          <HiOutlinePhoto />
          Dodaj zdjęcie
        </button>
      </div>
    </>
  );
}
