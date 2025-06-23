'use client';

import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <SideNav />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 h-full bg-white shadow-lg z-50">
            <SideNav onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-auto">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
