import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendar } from "react-icons/fa6";
import { registerLocale } from "react-datepicker";
import { pl } from 'date-fns/locale';
import "../../assets/styles/Sections.css";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({name, id, onChange}: {name: string, id: string, onChange: (date: Date) => void}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onChange(date);
  }

  registerLocale("pl", pl);

  return (
    <DatePicker 
      className="DatePicker"  
      name={name} 
      id={id} 
      selected={selectedDate} 
      onChange={handleDateChange} 
      dateFormat="dd-MM-yyyy" 
      locale="pl" 
      todayButton="Dzisiaj"
      showIcon 
      icon={<FaRegCalendar />} 
      popperPlacement="bottom-start"
    />
  );
}