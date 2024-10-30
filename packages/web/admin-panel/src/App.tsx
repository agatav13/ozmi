import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      {/* strona do logowania */}
      <SignedOut>
        <div className="SignedOutContainer">
          <SignInButton>
            <button className="SignInButton">Zaloguj się</button>
          </SignInButton>
          <a className="MainPageLink" href="" aria-label="Strona główna">
            Strona główna
          </a>
        </div>
      </SignedOut>

      {/* cała aplikacja widoczna po zalogowaniu */}
      <SignedIn>
        <div className="SignedInContainer">
          <Header />
          <NavBar />
        </div>
      </SignedIn>
    </>
  );
}
