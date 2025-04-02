'use client';

import { Product } from '@/app/types/product';
import { getBrandProducts } from '@/app/lib/data';
import Image from 'next/image';

export default function StorefrontPreview() {
  const products = getBrandProducts('Good Bud');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Storefront Preview</h1>
        <p className="mt-2 text-gray-600">This is how customers see your brand page</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">G</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Good Bud</h2>
            <p className="text-green-600 flex items-center">
              <span className="mr-1">✓</span> Verified Seller
            </p>
          </div>
        </div>
        
        <div className="prose max-w-none mb-6">
          <p>Premium quality cannabis products for the discerning customer.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              {product.Images[0] ? (
                <Image
                  src={product.Images[0]}
                  alt={product.Title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{product.Title}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.Description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${product.Price}</span>
                <span className="text-sm text-gray-600">{product.Serving}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
