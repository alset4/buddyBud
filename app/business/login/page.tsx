'use client';

import { useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import { light } from '@clerk/themes';

export default function BusinessLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Business Login</h2>
          <p className="mt-2 text-gray-600">
            Sign in to manage your business on weknowbud
          </p>
        </div>
        
        <SignIn 
          appearance={{
            baseTheme: light,
            elements: {
              formButtonPrimary: 'bg-green-600 hover:bg-green-700',
              footerActionLink: 'text-green-600 hover:text-green-700',
            },
          }}
          redirectUrl="/business/dashboard"
          routing="path"
          path="/business/login"
        />
      </div>
    </div>
  );
}