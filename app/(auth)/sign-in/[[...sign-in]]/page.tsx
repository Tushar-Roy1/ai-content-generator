'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-purple-100 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-6">
        Welcome to GENIVO
      </h1>
      <SignIn redirectUrl="/dashboard" />
    </div>
  );
}
