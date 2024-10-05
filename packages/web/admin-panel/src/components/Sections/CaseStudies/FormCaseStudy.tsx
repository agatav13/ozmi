import { CaseStudyDataType, CaseStudyInputType } from "types";
import DateInput from "../../reusable/DateInput";
import { useState } from "react";
import SelectInput from "../../reusable/SelectInput";
import InputsCaseStudies from "./InputsCaseStudies";

interface FormCaseStudyProps {
  updateShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onPostAdded: () => void;
}

export default function FormCaseStudy({ updateShowForm, onPostAdded }: FormCaseStudyProps) {
  const caseStudyData: CaseStudyDataType = {
    title: "",
    date: new Date(),
    category: "",
  };

  const [responseBody, setResponseBody] = useState<CaseStudyDataType>(caseStudyData);
  const [formElements, setFormElements] = useState<CaseStudyInputType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setResponseBody({ ...responseBody, [name]: value });
  };

  // obsługuje zmiany w InputsCaseStudies w polach tekstowych i zdjęciach
  const handleFormDataChange = (data: CaseStudyInputType[]) => {
    setFormElements(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", responseBody);

    const formDataToPost = new FormData();
    formDataToPost.append("title", responseBody.title);
    formDataToPost.append("date", responseBody.date.toISOString());
    formDataToPost.append("category", responseBody.category);

    formDataToPost.append("contentData", JSON.stringify(formElements));

    // dodaje zdjęcia
    formElements.forEach((element, index) => {
      if (element.type === "file" && element.content) {
        formDataToPost.append("images", element.content);
      }
    });

    try {
      const response = await fetch(
        "http://localhost:5000/create-case-study-posts",
        {
          method: "POST",
          body: formDataToPost,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      onPostAdded(); // żeby po dodaniu nowego postu wyświetlał się bez odświeżania
      updateShowForm(false); // ukrywa element dodawania postu po dodaniu
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label htmlFor="title">Tytuł</label>
      <input
        type="text"
        name="title"
        id="title"
        required
        onChange={handleChange}
      />

      <label htmlFor="date">Data</label>
      <DateInput
        name="date"
        id="date"
        onChange={(date) => setResponseBody({ ...responseBody, date })}
      />

      <label htmlFor="category">Kategoria</label>
      <SelectInput
        name="category"
        id="category"
        options={["Przemysł", "E-commerce", "Inne"]}
        onChange={handleChange}
      />

      <InputsCaseStudies onFormDataChange={handleFormDataChange} />

      <input className="AddNewButton" type="submit" value="Dodaj" />
    </form>
  );
}
