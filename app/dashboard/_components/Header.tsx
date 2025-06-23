'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Header() {
  const { user } = useUser();
  const [isPro, setIsPro] = useState(false);

  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const fetchPlan = async () => {
      if (!email) return;
      try {
        const res = await fetch(`/api/subscription-status?email=${email}`);
        const { isPro } = await res.json();
        setIsPro(isPro);
      } catch (err) {
        console.error('Failed to check subscription status:', err);
      }
    };

    fetchPlan();
  }, [email]);

  return (
    <header className="p-4 shadow-sm border-b flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
      {/* Search Bar */}
      <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md w-full max-w-md bg-gray-100 focus-within:ring-2 focus-within:ring-purple-500 transition">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Conditional Membership Banner */}
      {!isPro ? (
        <Link href="/dashboard/billing">
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-full px-6 py-2 text-sm text-white font-semibold shadow-md hover:scale-105 transition-transform cursor-pointer">
            💎 Join Membership for <span className="font-bold">₹99</span> Only
          </div>
        </Link>
      ) : (
        <div className="bg-green-600 rounded-full px-6 py-2 text-sm text-white font-semibold shadow-md">
          ✅ You are a Pro Member
        </div>
      )}

      {/* User Profile */}
      <UserButton />
    </header>
  );
}

export default Header;
