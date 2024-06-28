import { SignInButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function SignedOutPage() {
    return (
        <div className="SignedOutContainer">
            <SignInButton>
                <button className="SignInButton">Zaloguj się</button>
            </SignInButton>
            <Link to={"/"} className="MainPageLink">Strona główna</Link>
        </div>
    );
}