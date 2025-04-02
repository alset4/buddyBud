import Navbar from '@/app/components/Navbar';
import FeaturedSection from '@/app/components/FeaturedSection';

export default function OnlinePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <h1 className="text-2xl font-bold">Online Store</h1>
        <FeaturedSection />
      </div>
    </main>
  );
}
