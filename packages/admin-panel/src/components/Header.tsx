import "../assets/styles/Header.css"
import { UserButton } from "@clerk/clerk-react";
import { TiHome } from "react-icons/ti";

export default function Header() {
    return (
        <div className="Header">
            <div className="HeaderText">
                <h1>Ośrodek Zastosowań Matematyki i Informatyki</h1>
                <h2>Panel Administratora</h2>
            </div>
            <div className="HeaderButtons">
                <a href="" className="HomeButton"><TiHome /></a>
                <UserButton />
            </div>
        </div>
    );
}