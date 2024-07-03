import { ConfigProvider, DatePicker, Form } from "antd";
import locale from 'antd/locale/pl_PL';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pl';

export default function DateInput() {
    const dateFormat = 'DD-MM-YYYY'

    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.locale('pl')

    const currentDateInPoland = dayjs().tz("Europe/Warsaw");

    return (
        <ConfigProvider locale={locale}>
            <Form.Item label="Data" name="date" rules={[{ required: true, message: "Pole jest wymagane" }]}>
                <DatePicker format={dateFormat} defaultValue={currentDateInPoland} />
            </Form.Item>
        </ConfigProvider>
    );
}