import { LogoutOutlined } from '@ant-design/icons';
import '../assets/styles/SideBar.css'
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from 'react-router-dom';

export default function SideBar() {
    const adminPageUrl = "/admin";
    
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: 'Aktualności',
            children: [
                {key: '1', label: <Link to='/admin/add-post'>Dodaj post</Link>},
                {key: '2', label: <Link to='/admin/edit-post'>Edytuj post</Link>},
                {key: '3', label: <Link to='/admin/delete-post'>Usuń post</Link>}
            ]
        },
        {
            key: 'sub2',
            label: 'Case studies',
            children: [
                {key: '4', label: 'Dodaj post'},
                {key: '5', label: 'Edytuj post'},
                {key: '6', label: 'Usuń post'}
            ]
        },
        {
            key: 'sub3',
            label: 'Szkoła Modelowania Matematycznego',
            children: [
                {key: '7', label: 'Dodaj post'},
                {key: '8', label: 'Edytuj post'},
                {key: '9', label: 'Usuń post'}
            ]
        },
        {
            key: 'sub4',
            label: 'Pracownia Matematyczna',
            children: [
                {key: '10', label: 'Dodaj post'},
                {key: '11', label: 'Edytuj post'},
                {key: '12', label: 'Usuń post'}
            ]
        },
        {
            key: 'sub5',
            label: 'Koło Naukowe Matematyki Stosowanej Insight.',
            children: [
                {key: '13', label: 'Dodaj post'},
                {key: '14', label: 'Edytuj post'},
                {key: '15', label: 'Usuń post'}
            ]
        }
    ];

    return (
        <Sider className='Sider' style={{position: 'fixed'}}>
            <div className="UserProfileContainer">
                <UserButton afterSignOutUrl={adminPageUrl} />
                <SignOutButton redirectUrl={adminPageUrl}>
                    <Button icon={<LogoutOutlined />} type="primary" ghost>
                        Wyloguj się
                    </Button>
                </SignOutButton>
            </div>
            <div className="SideNav">
                <Menu
                    triggerSubMenuAction="click"
                    mode="inline"
                    items={items}
                />
            </div>
        </Sider>
    );
}