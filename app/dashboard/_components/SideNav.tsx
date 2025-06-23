'use client';

import React from 'react';
import { FileClock, Home, Settings, WalletCards, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import TrackUsage from './TrackUsage';

type Props = {
  onClose?: () => void;
};

const SideNav = ({ onClose }: Props) => {
  const path = usePathname();
  const router = useRouter();

  const MenueList = [
    { name: 'Home', logo: Home, path: '/dashboard' },
    { name: 'Billing', logo: WalletCards, path: '/dashboard/billing' },
    { name: 'History', logo: FileClock, path: '/dashboard/history' },
    { name: 'Settings', logo: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="h-full bg-white shadow-sm p-4 flex flex-col justify-between">
      <div>
        {/* Logo + Close button on mobile */}
        <div className="flex justify-between items-center mb-6">
  {/* Close button (left side) */}
  {onClose && <X className="md:hidden cursor-pointer" onClick={onClose} />}

  {/* Logo aligned right */}
  <Image
    src="/image.svg"
    alt="Logo"
    width={100}
    height={40}
    className="ml-8"
  />
</div>


        {/* Navigation links */}
        {MenueList.map((menu) => (
          <div
            key={menu.name}
            className={`flex items-center  gap-2 p-3 rounded-lg cursor-pointer mb-2 ${
              path === menu.path ? 'bg-purple-600 text-white' : 'hover:bg-purple-100 text-gray-700'
            }`}
            onClick={() => {
              router.push(menu.path);
              if (onClose) onClose(); // Close on click in mobile
            }}
          >
            <menu.logo size={18} />
            <span className="text-lg font-semibold">{menu.name}</span>
          </div>
        ))}
      </div>

      <TrackUsage />
    </div>
  );
};

export default SideNav;
