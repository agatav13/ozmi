import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';

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
          <NavBar />
        </div>
      </SignedIn>
    </>
  );
}