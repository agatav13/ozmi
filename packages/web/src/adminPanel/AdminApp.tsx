import { ConfigProvider, Layout, Typography } from "antd";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { theme1 } from "./assets/themes/theme";

export default function AdminApp(){
    const { Title } = Typography;

    return (
        <ConfigProvider theme={theme1}>
        <Layout hasSider>
            <SideBar />
            <Layout className="AdminMainPage">
                <Header style={{height: 'auto'}}>
                    <Title level={2}>Ośrodek Zastosowań Matematyki i Informatyki</Title>
                </Header>
                <Content style={{display:'flex', justifyContent: 'center'}}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
        </ConfigProvider>
    );
}