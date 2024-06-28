import { SignedIn, SignedOut } from "@clerk/clerk-react";
import "./AdminPanel.css"
import AdminApp from "./AdminApp";
import SignedOutPage from "./components/SignedOutPage";

export default function AdminPanel() {
    return (
        <>
            <SignedIn>
                <AdminApp />
            </SignedIn>
            <SignedOut>
                <SignedOutPage />
            </SignedOut>
        </>
    );
}