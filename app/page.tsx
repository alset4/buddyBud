import Navbar from "@/app/components/Navbar";
import PromoBanner from "@/app/components/PromoBanner";
import CategorySection from "@/app/components/CategorySection";
import AllSection from "@/app/components/AllSection";
import Footer from "@/app/components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <PromoBanner />
        <CategorySection />
        <AllSection/>
      </div>
      <Footer/>   
   </main>
  );
}
