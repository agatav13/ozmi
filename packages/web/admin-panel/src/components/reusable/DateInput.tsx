import { ConfigProvider, DatePicker } from "antd";
import locale from 'antd/locale/pl_PL';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pl';
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";

export default function DateInput({name, id, onChange}: {name: string, id: string, onChange: (date: Date) => void}) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('pl')

  const currentDateInPoland = dayjs().tz("Europe/Warsaw");

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(currentDateInPoland);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      onChange(date.toDate());
    }
  }

  return (
    <ConfigProvider locale={locale} theme={{
      "components": {
        "DatePicker": {
          "activeBorderColor": "rgb(0, 0, 0)",
          "colorPrimary": "#6b6b6b",
          "activeShadow": "",
          "colorBgElevated": "#e6e6e6",
          "activeBg": "#e6e6e6",
          "fontFamily": "'Roboto', sans-serif"
        }
      }
    }}>
      <DatePicker 
        name={name} 
        id={id} 
        format="DD-MM-YYYY" 
        suffixIcon={<FiCalendar />}
        defaultValue={selectedDate} 
        onChange={handleDateChange}
      />
    </ConfigProvider>
  );
}