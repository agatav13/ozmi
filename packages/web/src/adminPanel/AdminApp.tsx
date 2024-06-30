import { SignOutButton, UserButton } from "@clerk/clerk-react";

export default function AdminApp(){
    const adminPageUrl = "/admin"

    return (
        <>
            <h1>Siemka</h1>
            <UserButton afterSignOutUrl={adminPageUrl} />
            <SignOutButton redirectUrl={adminPageUrl} />
        </>
    );
}