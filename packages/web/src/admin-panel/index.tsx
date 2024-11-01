import React from "react";
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function AdminPanel() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
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
    </ClerkProvider>
  );
}
