import Navbar from "@/app/components/Navbar";
import PromoBanner from "@/app/components/PromoBanner";
import CategorySection from "@/app/components/CategorySection";
import FeaturedSection from "@/app/components/FeaturedSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <PromoBanner />
        <CategorySection />
        <FeaturedSection />
      </div>
    </main>
  );
}
