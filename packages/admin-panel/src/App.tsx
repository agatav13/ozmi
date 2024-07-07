import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';

export default function App() {
  return (
    <>
      <SignedOut>
        <div className="SignedOutContainer">
          <SignInButton>
            <button className="SignInButton">Zaloguj się</button>
          </SignInButton>
          <a className='MainPageLink' href="">Strona główna</a>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}