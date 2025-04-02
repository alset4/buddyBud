'use client';

import Link from 'next/link';
import { 
  FaInstagram, 
  FaTwitter, 
  FaTiktok, 
  FaLeaf, 
  FaShippingFast, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaUserShield 
} from 'react-icons/fa';
import { 
  MdLocalOffer, 
  MdStorefront, 
  MdHelp, 
  MdDescription 
} from 'react-icons/md';
import { RiPlantLine } from 'react-icons/ri';

const FooterSection = () => {
  return (
    <footer className="bg-white mt-16 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <RiPlantLine className="text-green-600 text-2xl" />
              <h3 className="text-lg font-semibold text-leaves">weknowbud</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted source for quality THC-A products.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-green-600">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-600">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-green-600">
                <FaTiktok size={20} />
              </Link>
            </div>
          </div>
            {/* Business */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Business</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <MdHelp className="text-green-600" />
                  Claim a Store!
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaPhoneAlt className="text-green-600" />
                  Business Login
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaShippingFast className="text-green-600" />
                  Business Support
                </Link>
              </li>
            </ul>
          </div>


          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/online" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <MdStorefront className="text-green-600" />
                  Shop Online
                </Link>
              </li>
              <li>
                <Link href="/nearby" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />
                  Find Nearby
                </Link>
              </li>
              <li>
                <Link href="/all" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaLeaf className="text-green-600" />
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <MdLocalOffer className="text-green-600" />
                  Today's Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <MdHelp className="text-green-600" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaPhoneAlt className="text-green-600" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaShippingFast className="text-green-600" />
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-gray-600 hover:text-green-600 text-sm flex items-center gap-2">
                  <FaLeaf className="text-green-600" />
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} weknowbud. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500 text-sm flex items-center gap-2">
                Made with <RiPlantLine className="text-green-600" /> in California
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;