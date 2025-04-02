import { FaBalanceScale, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import { MdGavel, MdSecurity } from 'react-icons/md';
import FooterSection from '../components/FooterSection';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <FaBalanceScale className="text-green-600 text-4xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">THC-A Legal Status</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding the legal framework surrounding THC-A products and their federal compliance status
            </p>
          </div>

          {/* Legal Status Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="flex items-start gap-4">
              <MdGavel className="text-green-600 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Federal Legal Status</h2>
                <p className="text-gray-600 leading-relaxed">
                  THC-A (Tetrahydrocannabinolic Acid) exists in a distinct legal category from traditional marijuana products. Under current federal regulations, THC-A is legal to ship and possess in most states, as it is the non-psychoactive precursor to THC. This classification allows for broader distribution and accessibility while maintaining compliance with federal guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="flex items-start gap-4">
              <FaShippingFast className="text-green-600 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Interstate Commerce</h2>
                <p className="text-gray-600 leading-relaxed">
                  We are pleased to offer shipping services to most U.S. states where THC-A products are permitted. Our compliance team regularly monitors state-by-state regulations to ensure all shipments meet legal requirements. However, customers are responsible for verifying their local laws regarding THC-A products.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Section */}
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="flex items-start gap-4">
              <MdSecurity className="text-green-600 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Compliance Commitment</h2>
                <p className="text-gray-600 leading-relaxed">
                  We maintain strict compliance protocols to ensure all our THC-A products meet federal guidelines. Each product undergoes rigorous testing and verification to confirm THC-A content and purity levels. Our commitment to transparency means you can trust in the quality and legality of our products.
                </p>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-green-50 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Points to Remember</h3>
            <ul className="space-y-3">
              {[
                "THC-A is federally legal and distinct from traditional marijuana products",
                "Interstate shipping is available to most U.S. states",
                "All products undergo comprehensive testing and verification",
                "Customers should verify their local regulations",
                "We maintain strict compliance with federal guidelines"
              ].map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="text-sm text-gray-500 border-t pt-8">
            <p className="text-center">
              This information is provided for educational purposes only and is not legal advice. 
              Laws and regulations may change. Customers are responsible for compliance with their local laws.
            </p>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}