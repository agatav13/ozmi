import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import AdminPanel from './AdminPanel';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function AdminPanelWrapper() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AdminPanel />
    </ClerkProvider>
  );
}