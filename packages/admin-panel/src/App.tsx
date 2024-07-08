import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import './App.css';
import Header from './components/Header';

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
        <div className='SignedInContainer'>
          <Header />
        </div>
      </SignedIn>
    </>
  );
}