import { ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import "./AdminPanel.css"
import AdminApp from "./AdminApp";
import { Link } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function AdminPanel() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <SignedIn>
                <AdminApp />
            </SignedIn>
            <SignedOut>
                <div className="SignedOutContainer">
                    <SignInButton>
                        <button className="SignInButton">Zaloguj się</button>
                    </SignInButton>
                    <Link to={"/"} className="MainPageLink">Strona główna</Link>
                </div>
            </SignedOut>
        </ClerkProvider>
    );
}