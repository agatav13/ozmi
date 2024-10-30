import { Select } from "antd";

interface SelectInputProps {
  name: string;
  id: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

// tworzy menu z wyborem kategorii, w options przyjmuje array ze stringami, które mają być opcjami do wyboru
// value przymuje to co będzie wyświetlone po otwarciu formy, jeżeli nic nie ma to defaultowo jest "Wybierz kategorię"
export default function SelectInput({ name, id, options, onChange, value }: SelectInputProps) {
  type Option = {
    value: string;
    label: string;
  };

  const optionsArray: Option[] = options.map((option) => ({
    value: option,
    label: option,
  }));

  const handleSelectChange = (selectedValue: string) => {
    const event = {
      target: {
        name: name,
        value: selectedValue,
      },
    } as React.ChangeEvent<HTMLSelectElement>;

    onChange(event);
  };

  const defaultValue = value ? value : "Wybierz kategorię";

  return (
    <Select
      id={id}
      variant="borderless"
      popupClassName="DropDownSelect"
      onChange={handleSelectChange}
      options={optionsArray}
      defaultValue={defaultValue}
    />
  );
}
