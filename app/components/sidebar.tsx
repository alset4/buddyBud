'use client';

import { UserButton, SignOutButton } from '@clerk/nextjs';
import { BarChart, LineChart, Package, Store, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Good Bud</h2>
          <UserButton afterSignOutUrl="/business/login" />
        </div>
      </div>
      <nav className="p-4 flex-grow">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onTabChange('overview')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === 'overview'
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart className="w-5 h-5 mr-3" />
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('products')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === 'products'
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Package className="w-5 h-5 mr-3" />
              All Products
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('analytics')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === 'analytics'
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LineChart className="w-5 h-5 mr-3" />
              Analytics
            </button>
          </li>
          <li>
            <button
              onClick={() => onTabChange('storefront')}
              className={`w-full flex items-center p-2 rounded-lg ${
                activeTab === 'storefront'
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Store className="w-5 h-5 mr-3" />
              Storefront
            </button>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <SignOutButton>
          <button className="w-full flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
