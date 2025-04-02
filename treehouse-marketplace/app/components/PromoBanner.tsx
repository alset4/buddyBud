export default function PromoBanner() {
  return (
    <div className="bg-leaves rounded-lg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-2">Buy 1 get 2 FREE on PREROLLS</h2>
          <p className="text-gray-100">2/19 - 2/20 ACT NOW!</p>
        </div>
        <div className="hidden md:block">
          {/* Add an image here if needed */}
        </div>
      </div>
    </div>
  );
}
