import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Upload } from "antd";
import { useState } from "react";
import { CaseStudyElement } from "types";

export default function AddCaseStudy() {
    const { Title } = Typography;

    const [elements, setElements] = useState<CaseStudyElement[]>([]);

    const addElement = (type: 'text' | 'photo') => {
        setElements([...elements, { type, id: Date.now() }]);
    };

    const deleteElement = (id: number) => {
        setElements(elements.filter(element => element.id !== id));
    };

    const renderElement = (element: CaseStudyElement) => {
        switch (element.type) {
            case 'text':
                return (
                    <Form.Item key={element.id} label='Treść' name={`content-${element.id}`}>
                        <Input.TextArea rows={6} />
                        <Button onClick={() => deleteElement(element.id)} type="text" ghost icon={<DeleteFilled style={{color: '#ba382f'}} />} />
                    </Form.Item>
                );
            case 'photo':
                return (
                    <Form.Item key={element.id} label='Zdjęcie' name={`photo-${element.id}`}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Dodaj zdjęcie</Button>
                        </Upload>
                        <Button onClick={() => deleteElement(element.id)} type="text" ghost icon={<DeleteFilled style={{color: '#ba382f'}} />} />
                    </Form.Item>
                );
            default:
                return null;
        }
    }

    return (
        <>
            <Form layout="vertical" style={{width: '60%'}}>
                <Title level={3}>Dodaj nowy post</Title>
                <Form.Item label="Tytuł" name="title" rules={[{ required: true, message: "Pole jest wymagane" }]}>
                    <Input />
                </Form.Item>

                {elements.map(renderElement)}

                <Form.Item>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                    <Button onClick={() => addElement('text')} style={{backgroundColor: '#e6e6e6'}}>Dodaj tekst</Button>
                    <Button onClick={() => addElement('photo')} style={{backgroundColor: '#e6e6e6'}}>Dodaj zdjęcie</Button>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Dodaj
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}