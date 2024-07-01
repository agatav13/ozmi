import { Button, ConfigProvider, DatePicker, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from 'antd/locale/pl_PL';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pl';

export default function AddPost() {
    const { Option } = Select;

    const dateFormat = 'DD-MM-YYYY'

    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.locale('pl')

    const currentDateInPoland = dayjs().tz("Europe/Warsaw");

    return (
        <ConfigProvider locale={locale}>
            <Form name="basic" layout="vertical" style={{width: '60%'}}>
                <h2>Dodaj nowy post</h2>
                <Form.Item label="Tytuł" name="title" rules={[{ required: true, message: "Pole jest wymagane" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Kategoria" name="tags">
                    <Select placeholder="Wybierz odpowiednią opcję" allowClear>
                        <Option value="Szkoła Modelowania Matematycznego">Szkoła Modelowania Matematycznego</Option>
                        <Option value="inne">Inne</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Data" name="date" rules={[{ required: true, message: "Pole jest wymagane" }]}>
                    <DatePicker format={dateFormat} defaultValue={currentDateInPoland} />
                </Form.Item>
                <Form.Item label="Treść" name="content" rules={[{ required: true, message: "Pole jest wymagane" }]}>
                    <TextArea rows={6} />
                </Form.Item>
                <Form.Item label="Zdjęcia" name="photos">
                    <Upload action="" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <div style={{ marginTop: 8 }}>Dodaj zdjęcie</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Dodaj
                    </Button>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
}