import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LevelKeysProps } from "types";

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
    }
];

const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(items1);
    return key;
};
  
const levelKeys = getLevelKeys(items as LevelKeysProps[]);

export default function SideMenu() {
    const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
    
    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    .filter((_, index) => index !== repeatIndex)
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            setStateOpenKeys(openKeys);
        }
    };

    return (
        <Menu
            mode="inline"
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            items={items}
        />
    );
  
}