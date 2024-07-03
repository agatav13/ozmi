import { LogoutOutlined, MoonFilled, SunFilled } from '@ant-design/icons';
import '../assets/styles/SideBar.css'
import { SignOutButton, UserButton } from "@clerk/clerk-react";
import { Button, Switch } from "antd";
import Sider from "antd/es/layout/Sider";
import { dark } from "@clerk/themes";
import SideMenu from './SideMenu';
import { SideBarProps } from 'types';

export default function SideBar({ isDarkMode, onToggle }: SideBarProps) {
    const adminPageUrl = "/admin";

    return (
        <Sider className='Sider' style={{position: 'fixed'}}>
            <div className="UserProfileContainer">
                <UserButton afterSignOutUrl={adminPageUrl} appearance={{
                    variables: {
                        fontFamily: 'Verdana, sans-serif'
                    },
                    baseTheme: isDarkMode ? dark : undefined
                }} />
                <Switch className='ToggleButton' onClick={onToggle} checked={isDarkMode} checkedChildren={<MoonFilled />} unCheckedChildren={<SunFilled />} />
            </div>
            <div className='SideMenu'>
                <SideMenu />
            </div>
            <div className='SignOutButtonContainer'>
                <SignOutButton redirectUrl={adminPageUrl}>
                    <Button icon={<LogoutOutlined />} type="primary" ghost>
                        Wyloguj się
                    </Button>
                </SignOutButton>
            </div>
        </Sider>
    );
}