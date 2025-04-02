'use client';

import Image from 'next/image';

export default function UnderConstruction() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-2xl text-center space-y-8">
        
        <h1 className="text-4xl font-bold text-gray-800 mt-8">
          🚧 Under Construction 🚧
        </h1>
        
        <p className="text-xl text-gray-600 mt-4">
          We're working hard to bring you something amazing! This page will be ready soon.
        </p>
        
        <div className="mt-6 text-gray-500">
          <p>In the meantime, feel free to explore our other sections!</p>
        </div>

        <div className="relative mt-8">
          <div className="h-2 w-64 mx-auto bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-treehouse animate-progress-bar rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}