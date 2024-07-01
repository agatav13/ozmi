import '../assets/styles/SideBar.css'
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";

export default function SideBar() {
    const adminPageUrl = "/admin";
    
    type MenuItem = Required<MenuProps>['items'][number];

    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: 'Aktualności',
            children: [
                {key: '1', label: 'Dodaj post'},
                {key: '2', label: 'Edytuj post'},
                {key: '3', label: 'Usuń post'}
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

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click', e)
    }

    return (
        <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0}}>
            <div className="UserProfileContainer">
                <UserButton afterSignOutUrl={adminPageUrl} />
                <SignOutButton redirectUrl={adminPageUrl}>
                    <Button type="primary" ghost>
                        Wyloguj się
                    </Button>
                </SignOutButton>
            </div>
            <div className="SideNav">
                <Menu
                    // onClick={onClick}
                    triggerSubMenuAction="click"
                    style={{width: 200}}
                    mode="inline"
                    items={items}
                    theme="dark"
                />
            </div>
        </Sider>
    );
}