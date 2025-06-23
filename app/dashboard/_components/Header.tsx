'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
  onMenuClick?: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
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
    <header className="bg-white flex items-center justify-between p-4 shadow-sm border-b flex-wrap gap-2">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-2">
        <Image
          src="/image.svg"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-full border-2 border-purple-600 p-1 cursor-pointer md:hidden"
          onClick={onMenuClick}
        />
        <h1 className="text-lg font-bold text-purple-700">Genivo</h1>
      </div>

      {/* Center: Membership Banner */}
      <div className="flex-grow text-center">
        {!isPro ? (
          <Link href="/dashboard/billing">
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-full px-4 py-1 text-xs text-white font-semibold shadow hover:scale-105 transition inline-block whitespace-nowrap">
              💎 Join Membership for ₹99 Only
            </div>
          </Link>
        ) : (
          <div className="bg-green-600 rounded-full px-4 py-1 text-md text-white font-semibold shadow inline-block whitespace-nowrap">
            ✅ You are a Pro Member
          </div>
        )}
      </div>

      {/* Right: User Profile */}
      <div className="flex-shrink-0">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
