import { CaseStudyDataType, CaseStudyDataTypeWithId } from "types";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setResponseBody({ ...responseBody, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", responseBody);

    try {
      const response = await fetch(
        "http://localhost:5000/create-case-study-posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(responseBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      onPostAdded(); // żeby po dodaniu nowego postu wyświetlał się bez odświeżania
      setResponseBody(caseStudyData); // ustawia wartości, które były w poście jako reponseBody
      updateShowForm(false); // ukrywa element dodawania postu po dodaniu
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label htmlFor="title">Tytuł</label>
      <input type="text" name="title" id="title" required onChange={(e)=>handleChange(e)} />

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

      <InputsCaseStudies />

      <input className="AddNewButton" type="submit" value="Dodaj" />
    </form>
  );
}
