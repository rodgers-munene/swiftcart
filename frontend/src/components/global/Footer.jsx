import { PhoneCallIcon, MailIcon } from "lucide-react";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-200 py-10">
      {/* Newsletter */}
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between border-b border-gray-300 dark:border-gray-700 pb-8">
        <div className="mb-5 md:mb-0 md:w-1/2">
          <h2 className="text-lg sm:text-xl font-semibold">Join our Newsletter</h2>
          <p className="text-sm mt-1">
            Get updates on promotions and coupons. No spam, ever.
          </p>
        </div>
        <form className="flex w-full md:w-1/2 lg:w-1/3">
          <input
            type="email"
            className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm outline-none"
            placeholder="Enter your email"
          />
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r-md hover:bg-blue-700">
            Subscribe
          </button>
        </form>
      </div>

      {/* Links */}
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 border-b border-gray-300 dark:border-gray-700">
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <p className="flex items-center text-sm">
            <PhoneCallIcon size={16} className="mr-2" /> +254 707 435 237
          </p>
          <p className="flex items-center text-sm mt-2">
            <MailIcon size={16} className="mr-2" /> info@example.com
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Make Money</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Sell on SwiftCart</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Wishlist</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-6xl mx-auto px-5 py-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xs sm:text-sm mb-3 sm:mb-0">
          © 2025 SwiftCart. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <FaFacebook className="text-xl hover:text-blue-600 cursor-pointer" />
          <FaTwitter className="text-xl hover:text-blue-500 cursor-pointer" />
          <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
