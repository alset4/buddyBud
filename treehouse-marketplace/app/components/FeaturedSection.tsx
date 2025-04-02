import ProductCard from './ProductCard';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 1,
    title: 'Sour Diesel Smalls',
    price: 12.00,
    rating: 4.8,
    reviews: 86,
    imageUrl: '/products/sour-diesel.jpg',
    brand: 'THCDirect'
  },
  {
    id: 2,
    title: 'Sour Diesel Smalls',
    price: 10.00,
    rating: 4.6,
    reviews: 86,
    imageUrl: '/products/sour-diesel.jpg',
    brand: 'THCDirect'
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Items</h2>
          <Link href="/featured" className="text-green-600 text-sm hover:text-green-700">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
