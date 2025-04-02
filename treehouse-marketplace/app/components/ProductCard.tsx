import Image from 'next/image';
import { FiStar } from 'react-icons/fi';

interface ProductCardProps {
  title: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  brand: string;
}

export default function ProductCard({ title, price, rating, reviews, imageUrl, brand }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        <div className="flex items-center gap-1">
          <FiStar className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{rating}</span>
          <span className="text-sm text-gray-400">({reviews} reviews)</span>
        </div>
        <p className="font-semibold text-green-600">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
