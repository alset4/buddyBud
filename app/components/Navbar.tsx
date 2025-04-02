'use client';

import Link from 'next/link';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-semibold text-leaves">
            weknowflower
          </Link>
          <div className="flex gap-4">
            <Link href="/online" className="text-gray-600 hover:text-green-800">Online</Link>
            <Link href="/nearby" className="text-gray-600 hover:text-green-800">Nearby</Link>
            <Link href="/all" className="text-gray-600 hover:text-green-800">All</Link>
          </div>
        </div>
        
        <div className="relative flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search Product Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-800">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <Link href="/cart" className="text-gray-600 hover:text-green-800">
            <FiShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}
