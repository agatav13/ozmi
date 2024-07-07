import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';

export default function App() {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}