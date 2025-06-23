'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <>
      {/* Background Effects */}
      <div className="main">
        <div className="gradient" />
      </div>

      {/* Content */}
      <div className="app relative z-10 min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="flex items-center justify-between w-full pt-6">
          {/* <div className="text-2xl font-bold text-purple-700">ContentMaker</div> */}
          <Image src={'/image.svg'} alt="Logo" width={140} height={40} />
          <Link href="/sign-in">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 cursor-pointer">
              Sign In
            </Button>
          </Link>
        </nav>

        {/* Hero Section */}
        {/* Hero Section */}
<section className="flex-grow flex flex-col justify-center items-center text-center mt-20">
  {/* App Name */}
  <h2 className="text-2xl md:text-3xl font-bold text-purple-500 mb-2 tracking-wide uppercase">
    Genivo
  </h2>

  {/* Main Tagline */}
  <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6 leading-tight">
    AI-Powered Content Generator
  </h1>

  <p className="text-lg md:text-xl text-gray-700 max-w-xl mb-8">
    Create blogs, social media posts, and more in seconds with powerful AI.
  </p>

  <Link href="/sign-in">
    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-full shadow-lg cursor-pointer">
      Get Started
    </Button>
  </Link>
</section>

        {/* Services Section */}
<section className="w-full py-12 px-4">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div className="flex flex-col items-center">
      <Image src={'/template.svg'} alt="Template" width={30} height={30} />
      <h3 className="font-semibold text-lg">20+ Templates</h3>
      <p className="text-gray-600 text-sm">Ready-made content formats for all needs.</p>
    </div>
    <div className="flex flex-col items-center">
      <Image src={'/free.svg'} alt="Free" width={30} height={30} />
      <h3 className="font-semibold text-lg">Free to Use</h3>
      <p className="text-gray-600 text-sm">Start without any payment barrier.</p>
    </div>
    <div className="flex flex-col items-center">
      <Image src={'/support.svg'} alt="Support" width={30} height={30} />
      <h3 className="font-semibold text-lg">24/7 Support</h3>
      <p className="text-gray-600 text-sm">We’re here whenever you need help.</p>
    </div>
    <div className="flex flex-col items-center">
      <Image src={'/secure.svg'} alt="Security" width={30} height={30} />
      <h3 className="font-semibold text-lg">Secure & Reliable</h3>
      <p className="text-gray-600 text-sm">Your data is safe with us.</p>
    </div>
  </div>
</section>

      </div>
    </>
  );
}
