import Link from 'next/link';
import { FiCoffee } from 'react-icons/fi';
import { GiSmokingPipe, GiCupcake } from 'react-icons/gi';
import { RiPlantLine } from 'react-icons/ri';

const categories = [
  { name: 'Flower', icon: RiPlantLine, href: '/category/flower' },
  { name: 'Vapes', icon: GiSmokingPipe, href: '/category/vapes' },
  { name: 'Edibles', icon: GiCupcake, href: '/category/edibles' },
  { name: 'Prerolls', icon: FiCoffee, href: '/category/prerolls' },
  { name: 'Concentrates', icon: RiPlantLine, href: '/category/concentrates' },
];

export default function CategorySection() {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
          <Link href="/categories" className="text-green-600 text-sm hover:text-green-700">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-2">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
