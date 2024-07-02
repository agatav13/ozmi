import { ConfigProvider, Layout, Typography, theme, Button, Card } from "antd";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { light, dark } from "./assets/themes/theme";
import { useState } from "react";

export default function AdminApp(){
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleClick = () => {
        setIsDarkMode((previousValue) => ! previousValue);
    };

    const { Title } = Typography;

    return (
        <ConfigProvider theme={isDarkMode ? dark : light}>
            <Layout hasSider>
                <SideBar isDarkMode={isDarkMode} onToggle={handleClick} />
                <Layout className="AdminMainPage">
                    <Header className="Header">
                        <Title level={2} style={{color: '#f5f5f5'}}>Ośrodek Zastosowań Matematyki i Informatyki</Title>
                    </Header>
                    <Content className="Content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}