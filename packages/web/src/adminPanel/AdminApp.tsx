import { Layout, Typography } from "antd";
import SideBar from "./components/SideBar";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";

export default function AdminApp(){
    const { Title } = Typography;

    return (
        <Layout hasSider>
            <SideBar />
            <Layout className="AdminMainPage">
                <Header style={{height: 'auto'}}>
                    <Title level={2} style={{color: '#f5f5f5'}}>Ośrodek Zastosowań Matematyki i Informatyki</Title>
                </Header>
                <Content style={{display:'flex', justifyContent: 'center'}}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}