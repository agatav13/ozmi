import { SignOutButton, UserButton } from "@clerk/clerk-react";

export default function AdminApp(){
    return (
        <>
            <h1>Siemka</h1>
            <UserButton afterSignOutUrl="/admin"/>
            <SignOutButton redirectUrl="/admin" />
        </>
    );
}