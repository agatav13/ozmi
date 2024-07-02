import { ConfigProvider, Layout, Typography } from "antd";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { light, dark } from "./assets/themes/theme";

export default function AdminApp(){
    const { Title } = Typography;

    return (
        <ConfigProvider theme={dark}>
            <Layout hasSider>
                <SideBar />
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