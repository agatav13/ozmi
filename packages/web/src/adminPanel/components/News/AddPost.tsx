import { Button, Form, Input, Select, Typography, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from '@ant-design/icons';
import DateInput from "../DateInput";

export default function AddPost() {
    const { Title } = Typography;
    const { Option } = Select;

    return (
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
            <DateInput />
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
    );
}