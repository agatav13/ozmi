import { Button, ConfigProvider, DatePicker, Form, Input, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from 'antd/locale/pl_PL';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pl';
import { UploadOutlined } from '@ant-design/icons';

export default function AddPost() {
    const { Title } = Typography;
    const { Option } = Select;

    const dateFormat = 'DD-MM-YYYY'

    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.locale('pl')

    const currentDateInPoland = dayjs().tz("Europe/Warsaw");

    return (
        <ConfigProvider locale={locale}>
            <Form name="basic" layout="vertical" style={{width: '60%'}}>
                <Title level={3}>Dodaj nowy post</Title>
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
                    <Upload action="">
                        <Button icon={<UploadOutlined />}>Dodaj zdjęcie</Button>
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