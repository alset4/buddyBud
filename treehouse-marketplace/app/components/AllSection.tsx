'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  Brand: string;
  Title: string;
  Images: string[];
  Verification: boolean;
  Description: string;
  Price: number;
  Serving: string;
}

const mockProducts: Product[] = [
  {
    _id: '12341234jkasdfa',
    Brand: 'Good Bud',
    Title: 'OG Kush',
    Images: ['https://images.leafly.com/flower-images/og-kush.png'],
    Verification: true,
    Description: "Cali's best OG Kush",
    Price: 25.00,
    Serving: '7 grams'
  },
  {
    _id: '12341234jkasdfb',
    Brand: 'Premium Farms',
    Title: 'Blue Dream',
    Images: ['https://images.leafly.com/flower-images/blue-dream.png'],
    Verification: true,
    Description: 'Sweet berry aroma with full-body relaxation',
    Price: 30.00,
    Serving: '7 grams'
  }
];

const useGetAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () => 
      new Promise((resolve) => {
        setTimeout(() => resolve(mockProducts), 1000);
      }),
  });
};

const AllSection = () => {
  const { data: products, isLoading } = useGetAllProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Link 
            href={`/product/${product._id}`} 
            key={product._id}
            className="block transition-transform hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={product.Images[0]}
                  alt={product.Title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-burn">{product.Brand}</span>
                  {product.Verification && (
                    <span className="text-treehouse">Verified Seller</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mt-1 text-black">{product.Title}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.Description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-black">${product.Price.toFixed(2)}</span>
                  <span className="text-sm text-labelred">{product.Serving}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllSection;
