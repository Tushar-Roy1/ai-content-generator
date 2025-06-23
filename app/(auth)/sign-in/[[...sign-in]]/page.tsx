'use client'

import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
        
        {/* 👇 Add redirectUrl prop here */}
        <SignIn redirectUrl="/dashboard" />
      </div>
    </div>
  );
}
