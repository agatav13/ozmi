import { Layout } from "antd";
import SideBar from "./components/SideBar";

export default function AdminApp(){

    return (
        <>
        <Layout hasSider>
            <SideBar />
        </Layout>
        </>
    );
}