'use client';

import { useState, useEffect } from 'react';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { IconType } from 'react-icons';
import { FaLeaf } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false);
  const { isSignedIn } = useAuth();
  
  useEffect(() => {
    const hasVerifiedAge = localStorage.getItem('ageVerified');
    if (!isSignedIn && !hasVerifiedAge) {
      setShowModal(true);
    }
  }, [isSignedIn]);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <FaLeaf className="text-green-600 text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Age Verification</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-2 text-amber-600">
            <MdWarning className="text-xl mt-1" />
            <p className="text-sm">
              You must be of legal age to view this content. Please verify your age or sign in to continue.
            </p>
          </div>
          
          <p className="text-gray-600 text-sm">
            By clicking "I am of legal age" or signing in, you confirm that you are of legal age to view and purchase THC-A products in your jurisdiction.
          </p>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={handleVerify}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
            >
              I am of legal age
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <SignInButton mode="modal">
              <button className="w-full border border-green-600 text-green-600 py-2 px-4 rounded hover:bg-green-50 transition-colors">
                Sign in to verify age
              </button>
            </SignInButton>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            This site contains substance-related content. Please consume responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}