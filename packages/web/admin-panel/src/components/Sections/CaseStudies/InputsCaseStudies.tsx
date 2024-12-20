import { useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { IoTextOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { CaseStudyInputType } from "types";

export default function InputsCaseStudies({ onFormDataChange }: { onFormDataChange: (data: CaseStudyInputType[]) => void }) {
  const [formElements, setFormElements] = useState<CaseStudyInputType[]>([]);

  const addTextArea = () => {
    const newElements: CaseStudyInputType[] = [...formElements, { type: "text", content: "" }]
    setFormElements(newElements);
    onFormDataChange(newElements);
  };

  const addFileInput = () => {
    const newElements: CaseStudyInputType[] = [...formElements, { type: "file", content: null }]
    setFormElements(newElements);
    onFormDataChange(newElements);
  };

  const handleContentChange = (index: number, value: any) => {
    const newElements = [...formElements];

    if (newElements[index].type === "file") {
      newElements[index].content = null;
    }

    newElements[index].content = value;
    setFormElements(newElements);
    onFormDataChange(newElements);
  };

  const deleteElement = (index: number) => {
    const newElements = formElements.filter((_, i) => i !== index);
    setFormElements(newElements);
  };

  const props: UploadProps = {
    name: "image",
    accept: "image/*",
    beforeUpload: (file) => false,
    onChange(info) {
      const { file } = info;
      const index = formElements.findIndex(
        (element) => element.type === "file" && (element.content === null || element.content)
      );
      if (index > -1) {
        handleContentChange(index, file);
      }
    },
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
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
            </>
          ) : (
            <>
              <div className="LabelCaseStudy">
                <label htmlFor="image">Zdjęcie</label>
                <button type="button" onClick={() => deleteElement(index)}>
                  <FaTrash />
                </button>
              </div>
              <Upload {...props}>
                <button type="button" className="CaseStudyUploadBtn"><LuUpload />Dodaj zdjęcie</button>
              </Upload>
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
