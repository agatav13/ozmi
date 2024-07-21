import { ConfigProvider, DatePicker } from "antd";
import locale from 'antd/locale/pl_PL';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pl';

export default function DateInput({name, id}: {name: string, id: string}) {
  const dateFormat = 'DD-MM-YYYY';
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale('pl')
  const currentDateInPoland = dayjs().tz("Europe/Warsaw");

  return (
    <ConfigProvider locale={locale} theme={{
      "components": {
        "DatePicker": {
          "activeBorderColor": "rgb(0, 0, 0)",
          "colorPrimary": "#b7b4b4",
          "activeShadow": "",
          "colorBgElevated": "#e6e6e6",
          "activeBg": "#e6e6e6",
          "fontFamily": "'Roboto', sans-serif"
        }
      }
    }}>
      <DatePicker name={name} id={id} defaultValue={currentDateInPoland} format={dateFormat} />
    </ConfigProvider>
  );
}