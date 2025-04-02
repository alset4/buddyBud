'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import Navbar from "@/app/components/Navbar";

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

// This would typically come from an API, using the same mock data for now
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

const useGetProduct = (id: string) => {
  return useQuery<Product | undefined, Error>({
    queryKey: ['product', id],
    queryFn: () => 
      new Promise((resolve) => {
        setTimeout(() => {
          const product = mockProducts.find(p => p._id === id);
          resolve(product);
        }, 1000);
      }),
  });
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: product, isLoading } = useGetProduct(params.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Navbar />
        <div className="py-8 animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Navbar />
        <div className="text-xl text-red-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <Card className="max-w-4xl mx-auto my-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative h-96 md:w-96 rounded-l-lg overflow-hidden">
            <Image
              src={product.Images[0]}
              alt={product.Title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-burn text-lg">{product.Brand}</span>
                {product.Verification && (
                  <Badge variant="secondary" className="text-treehouse bg-treehouse/10">
                    Verified Seller
                  </Badge>
                )}
              </div>
              <CardTitle className="text-3xl">{product.Title}</CardTitle>
              <CardDescription>{product.Description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">${product.Price.toFixed(2)}</div>
                  <Badge variant="outline" className="text-labelred">
                    {product.Serving}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-lg font-semibold">Reviews</div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">4.8 (125 reviews)</span>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full bg-treehouse hover:bg-treehouse/90">
                Add to Cart
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
